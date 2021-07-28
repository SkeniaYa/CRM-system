require("dotenv").config();
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const { dbConnectionURL, connect } = require("./db/config/config");
const clientsRouter = require("./routes/clients.router");
const adminRouter = require("./routes/admin.router");
const ordersRouter = require("./routes/orders.router");
const authRouter = require("./routes/authRouter");
const commentsRouter = require("./routes/comments.router")
const passport = require("passport");

const app = express();

const { PORT, COOKIE_SECRET, COOKIE_NAME } = process.env;

connect();

app.set("cookieName", COOKIE_NAME);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(
  session({
    name: app.get("cookieName"),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: dbConnectionURL,
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1e3 * 86400,
    },
  })
);

const isAdmin = function(req, res, next){
    if (!req.session?.passport?.user?.isAdmin) {
      res.redirect('/')
    };
    next();
}

app.use("/clients", clientsRouter);
app.use("/admin", isAdmin, adminRouter);
app.use("/orders", ordersRouter);
app.use("/auth", authRouter);
app.use("/comments", commentsRouter)
// app.get("/clients", (req, res) => {
//   res.send("тут будут клиенты");
// });

app.listen(PORT, () => {
  console.log("Server has been started on PORT ", PORT);
});
