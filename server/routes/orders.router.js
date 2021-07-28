const { Router } = require("express");
const router = Router();
const Order = require("../db/models/orderModel");
const Comment = require("../db/models/commentModel");
const Client = require("../db/models/clientModel");
const config = require("./config/config.json");
let http = require("request");

router.get("/new", (req, res) => {
  Order.find()
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(404));
});

router.post("/new/:id", async (req, res) => {
  const {
    number,
    typeFurn,
    priceFurn,
    priceDeliv,
    dateDeliv,
    priceConstr,
    dateConstr,
    teamDeliv,
    teamConstr,
    status,
    commentsWhenCreate,
    client,
  } = req.body;
  const userId = req.session.passport.user._id;
  try {
    if (number) {
      const newOrder = await Order.create({
        number,
        typeFurn,
        priceFurn,
        priceDeliv,
        dateDeliv,
        priceConstr,
        dateConstr,
        teamDeliv,
        teamConstr,
        status,
        commentsWhenCreate,
        creator: userId,
        client,
      });
      const updClient = await Client.findByIdAndUpdate(
        req.body.client,
        {
          $push: { orders: newOrder?._id },
        },
        { new: true }
      );
      console.log("newOrder==>", newOrder);
      console.log("updClient==>", updClient);

      let fields = [
        "<b>Новый заказ</b>: " + newOrder?.number,
        "<b>Тип мебели</b>: " + newOrder?.typeFurn,
        "<b>Дата доставки</b>: " + newOrder?.dateDeliv,
        "<b>Дата сборки</b>: " + newOrder?.dateConstr,
        "<b>Команда сборки</b>: " + newOrder?.teamConstr,
      ];
      let msg = "";
      fields.forEach((field) => {
        msg += field + "\n";
      });
      msg = encodeURI(msg);
      http.post(
        `https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${msg}`,
        function (error) {
          console.log("error:", error);
          console.log("statusCode:");
        }
      );

      res.json({ newOrder });
    }
  } catch (err) {
    return res.sendStatus(403);
  }
});

router.get("/all", async (req, res) => {
  try {
    const allOrders = await Order.find()
      .populate("creator")
      .populate("client")
      .sort({ _id: -1 });
    res.json(allOrders);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const currentOrder = await Order.findById(id)
      .populate("comments")
      .populate("client");
    res.json(currentOrder);
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true }
    );
    res.json(deletedOrder);
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { comment, userName } = req.body;
  let dat = new Date();
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  let dateNow = dat.toLocaleString("ru-RU", options);
  try {
    const newComment = await Comment.create({
      author: userName,
      body: comment,
      date: dateNow,
    });
    const updOrder = await Order.findByIdAndUpdate(
      id,
      { $push: { comments: newComment._id } },
      { new: true }
    ).populate("comments");
    res.json({ newComment, updOrder });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { commentId } = req.body;
  const currentOrder = await Order.findByIdAndUpdate(
    id,
    { $pull: { comments: commentId } },
    { new: true }
  ).populate("comments");
  await Comment.findByIdAndDelete(commentId);
  res.json(currentOrder);
});

router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updOrder = await Order.findByIdAndUpdate(id, req.body.order, {
      new: true,
    }).populate("client");

    res.json(updOrder);
  } catch (error) {
    return res.sendStatus(400);
  }
});

module.exports = router;
