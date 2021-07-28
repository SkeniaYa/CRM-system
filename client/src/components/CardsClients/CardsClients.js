import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { useDispatch, useSelector } from "react-redux";
import ClientInfo from "../ClientInfo/ClientInfo";
import { getCardCurrentClient } from "../../redux/actions/currentClient.action";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: '50px'
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: '18px',
  },

});

export default function CardsClients() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.currentClient);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getCardCurrentClient(id));
  }, []);

  return (
    <Card className={classes.root} variant="outlined">
      <ClientInfo
        name={items.name}
        surname={items.surname}
        patronymic={items.patronymic}
        email={items.email}
        phone={items.phone}
        address={items.address}
        orders={items.orders}
      />
    </Card>
  );
}
