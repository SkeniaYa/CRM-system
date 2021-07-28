import {
  CardHeader,
  Typography,
  IconButton,
  Avatar,
  Collapse,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { red } from "@material-ui/core/colors";
import EmailIcon from '@material-ui/icons/Email';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InputForNewWorker from "../InputForNewWorker/InputForNewWorker";
import { useDispatch, useSelector } from "react-redux";
import { allworkers, changeAdmin } from "../../../redux/actions/workers.action";

import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import ChooseAdmin from "./ChooseAdmin/ChooseAdmin";
import Modal from "../../Modal/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ListOfWorkers() {

  const [modalActive, setModalActive] = useState(false);

    const dispatch = useDispatch();
    const { workers } = useSelector((state) => state);
    useEffect(() => {
      fetch("http://localhost:3001/admin/workers", {
        credentials: "include",
      })
      .then((response) => response.json())
      .then((data) => dispatch(allworkers(data)));
    }, []);
    const classes = useStyles();
    const ChangeAdmin = async (e) => {
      e.preventDefault();
      const idcard = e.target.id;
      
      const response = await fetch(
        `http://localhost:3001/admin/workers/add/${idcard}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify({
            idcard,
          }),
          credentials: "include",
        }
        );
        const result = await response.json();
        await dispatch(changeAdmin(result));
      };
      
      return (
        <>
      <EmailIcon 
      onClick={()=>setModalActive(true)}
      style={{color:"white", fontSize: "80", position:"absolute", left:"10%", top:"13%" }} />
      <div
        style={{
          marginTop:"3%",
          display: "flex",
          flexWrap: "wrap",
          width: "101%",
          marginLeft: "0px"
        }}
      >
        <Modal active={modalActive} setActive={setModalActive}>
        <InputForNewWorker />

        </Modal >
        {workers?.map((e) => (
          <Card
          style={
            e.isAdmin
            ? {
              backgroundColor: "#575757",
                    width: "22%",
                    height: "380px",
                    margin: "15px",
                    borderColor: "black",
                    borderRadius: "10%",
                    color: "black",
                    borderStyle: "groove",
                  }
                : {
                    backgroundColor: "#aaaeb7a8",
                    width: "22%",
                    height: "380px",
                    color: "white",
                    borderRadius: "10%",
                    margin: "15px",
                    borderColor: "black",
                    borderStyle: "groove",
                  }
            }
            className={classes.root}
          >
            <CardHeader
              action={
                <IconButton style={{width:"27px"}}aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={e.name ? e.name : "Имя не указано"}
              subheader={e.email}
            />
            <CardMedia
              style={{
                borderStyle: "outset",
                marginLeft: "5%",
                height: "150px",
                borderColor: "black",
                width: "150px",
                borderRadius: "50%",
              }}
              className={classes.media}
              image={e.picture ? e.picture : "none"}
              title="Paella dish"
            />
<hr style={{marginTop:"20px"}}></hr>

            <Typography
              style={{
                color: "white",
                fontSize: "20px",
                paddingLeft: "20px",
                paddingTop: "26px",
              }}
              variant="body2"
              color="textSecondary"
              component="p"
              >
              Статус:
              <button
                onClick={ChangeAdmin}
                style={{
                  marginLeft: "4px",
                  color: "white",
                  borderColor: "white",
                  backgroundColor: "unset",
                }}
                id={e._id}
                className="btn btn-primary"
              >
                {e.isAdmin ? "Администратор" : "Пользователь"}
              </button>
            </Typography>
          </Card>
        ))}
      </div>
    </>
  );
}
