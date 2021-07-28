import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { FormHelperText, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { getClient } from "../../redux/actions/clients.action";
import { useHistory, useLocation } from "react-router";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import "./ClientAdd.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      // margin: theme.spacing(2),
      width: "100%",
    },
  },
  color: {
    "& .MuiFormLabel-root": {
      color: "white",
      fontSize: "20px",
    },
    "& .MuiInputBase-root": {
      color: "white",
      fontSize: "20px",
    },
    "& :before": {
      borderColor: "currentColor",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderColor: "currentColor",
    },
  },
  form: {
    paddingBottom: "30px",
  },
}));

export default function ClientAdd() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const [value, setValue] = useState();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  console.log(12341234, handleSubmit());
  const onSubmit = (data) => {
    dispatch(getClient(data, history, value));
    reset();
  };

  return (
    <form
      className="clientAddForm"
      onSubmit={handleSubmit(onSubmit)}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <br />
      <h1>Новый клиент</h1>
      <br />
      <hr />
      {errors.name && (
        <p className="help">Обязательное поле, не более 15 символов</p>
      )}
      <Grid className={classes.form} container spacing={3}>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            label="Фамилия"
            type="text"
            id="standard-required"
            {...register("surname")}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            // color={"secondary"}
            // style={{ color: "white" }}
            label="Имя"
            type="text"
            className={classes.color}
            id="standard-required"
            {...register("name", { required: true, maxLength: 15 })}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            label="Отчество"
            type="text"
            id="standard-required"
            {...register("patronymic")}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            label="email"
            type="email"
            id="standard-required"
            {...register("email")}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.color}
            placeholder="..."
            defaultValue="+7"
            label="Номер телефона"
            type="text"
            id="standard-required"
            {...register("phone")}
          />
        </Grid>
      </Grid>
      <p style={{color: 'white', fontSize: "18px"}}>Адрес:</p>
      <AddressSuggestions
        style={{ width: "50%" }}
        className="address"
        token="43f3a1a6e2e0bd7b18d5f3d1d16a515b2055ee55"
        value={value}
        onChange={setValue}
      />
      <br />
      <br />
      <hr />
      <br />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Добавить
        </Button>
      </div>
    </form>
  );
}
