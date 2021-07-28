import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { addWorkerEmail } from "../../../redux/actions/workers.action";
import { useHistory } from "react-router/";
import SmallModal from "./SmallModal/SmallModal";
import "./InputForNewWorker.css"
import Modal from "../../Modal/Modal";

// import nodemailer from 'nodemailer';

// const smtp = nodemailer.createTransport({
//   // host: 'smtp.someprovider.com',
//   // port: 587,
//   service: "gmail",
//   auth: {
//     user: '2same1as2@gmail.com',
//     pass: 'Zbc320098',
//   },
// });

// smtp.sendMail({
//   to: 'mt9686@inbox.ru',
//   from: '2same1as2@gmail.com',
//   subject: 'Testing Email Sends',
//   html: '<p>Sending some HTML to test.</p>',
// });

// export default (options = {}) => {
//   return smtp.sendMail(options);
// }











const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));

export default function InputForNewWorker() {
  const [modalActive, setModalActive] = useState(false);
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  

  const {
    register,
    handleSubmit,
    watch, //отслеживание содержимого инпута
    formState: { errors, submitCount },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    dispatch(addWorkerEmail(data, history));
  };

  return (
    <>
    <form
    style={{
      display: "inline-grid",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "270px",
    }}
      onSubmit={handleSubmit(onSubmit)}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <div>
        
        <br />
        <h1 style={{color:"black"}}>Добавить сотрудника</h1>
        <hr />
        <TextField
          label="email"
          type="email"
          id="standard-required"
          {...register("email")}
        />
        <br />
        <Button onClick={()=>{
          setModalActive(true)
          setTimeout(()=>{setModalActive(false)}
          ,3000)
          }} type="submit" variant="contained" color="primary">
          Отправить
        </Button>
      </div>
    </form>
    <div style={{
      backgroundColor: "transparent",
      width:"200px"}}>

    <SmallModal 
    style={{    marginTop: "-40%",
      width: "240px",
      marginRight: "55%"
  }}
    active={modalActive} setActive={setModalActive}>
        <div style={{width:"200px"}} className="card">
          <div className="card-header"></div>
          <div className="card-body">
          📬 Письмо отправлено
            <hr />
          </div>
        </div>
      </SmallModal>
              </div>
    </>
  );
}
