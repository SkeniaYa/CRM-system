import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import { getEditClient } from "../../redux/actions/currentClient.action";
import { getDeleteClient } from "../../redux/actions/currentClient.action";
import { useParams } from "react-router-dom";
import CommentsClients from "../CommentsClients/CommentsClients";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  "& > *": {
    margin: theme.spacing(1),
  },
}));

export default function ClientInfo({
  name,
  surname,
  patronymic,
  email,
  phone,
  address,
  orders,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState(false);
  const [formData, setFormData] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  // const item = useSelector((state) => state.clients);
  // const { clients } = item;

  console.log({
    name,
    surname,
    patronymic,
    email,
    phone,
    address,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  let history = useHistory();

  const { id } = useParams();

  const user = useSelector((state) => state.user);
  const userEmael = user?.email;
  const userId = user?._id;
  // console.log('121112121212', userId)

  const onSubmit = (data) => {
    dispatch(getEditClient(data, id));
    setModalActive(false);
  };

  const deleteHandler = () => {
    dispatch(getDeleteClient(id, history));
    setModalDelete(false);
  };

  return (
    <>
      <CardContent>
        <Typography
          // className={classes.title}
          color="textSecondary"
          gutterBottom
          variant="h4"
          component="h2"
        >
          <b>
            {surname} {name} {patronymic}
          </b>
        </Typography>
        <Typography style={{ color: "black", fontSize: "18px" }}>
          email: <b> {email} </b>
        </Typography>
        <Typography style={{ color: "black", fontSize: "18px" }}>
          Номер телефона: <b>{phone}</b>
        </Typography>
        <Typography style={{ color: "black", fontSize: "18px" }}>
          Адрес доставки: <b>{address}</b>
          <br />
          <p>
            Заказы:{" "}
            {orders?.map((el) => (
              <Link
                style={{
                  color: "black",
                  border: "1px solid black",
                  padding: "2px",
                  marginRight: "5px",
                }}
                to={`/orders/${el._id}`}
              >
                {el.number}&nbsp;
              </Link>
            ))}{" "}
          </p>
          <hr />
          <p>Оставить комментарий:</p>
          <CommentsClients />
        </Typography>
      </CardContent>

      <CardActions>
        <Link
          to={`/orders/new/${id}`}
          style={{ color: "black", fontSize: "14px" }}
        >
          СОЗДАТЬ ЗАКАЗ
        </Link>
        <Button onClick={() => setModalActive(true)} size="small">
          Редактировать
        </Button>
        <Button onClick={() => setModalDelete(true)} size="small">
          Удалить
        </Button>
      </CardActions>

      {modalActive ? (
        <Modal active={modalActive} setActive={setModalActive}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card">
              <div className="card-header">Редактирование карточки клиента</div>
              {errors.name && <p>Обязательное поле, не более 15 символов</p>}
              <div className="card-body">
                <h6>Имя</h6>
                <input
                  defaultValue={name}
                  {...register("name", { required: true, maxLength: 15 })}
                ></input>
                <h6>Фамилия</h6>
                <input defaultValue={surname} {...register("surname")}></input>
                <h6>Отчество</h6>
                <input
                  defaultValue={patronymic}
                  {...register("patronymic")}
                ></input>
                <h6>email</h6>
                <input defaultValue={email} {...register("email")}></input>
                <h6>Номер телефона</h6>
                <input defaultValue={phone} {...register("phone")}></input>
                <h6>Адрес доставки</h6>
                <input {...register("address")}></input>
                <hr />
                <span>
                  <Button type="submit" variant="contained" color="primary">
                    Изменить
                  </Button>
                </span>
              </div>
            </div>
          </form>
        </Modal>
      ) : (
        <></>
      )}

      <Modal active={modalDelete} setActive={setModalDelete}>
        <div className="card">
          <div className="card-header"></div>
          <div className="card-body">
            Вы уверены, что хотите удалить?
            <hr />
            <span>
              <Button
                onClick={deleteHandler}
                type="submit"
                variant="contained"
                color="primary"
              >
                Удалить
              </Button>
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
}
