import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import "./StyleListOfDeletedClients.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import React, { useState } from "react";
import {
  Grid,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Accordion,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CachedIcon from "@material-ui/icons/Cached";
import {
  changeDeleteStatus,
  allDeletedClients,
  deleteThisItem,
  editThisItem,
} from "../../../redux/actions/adminsElementsToDelete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ListOfDEletedClients() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const items = useSelector((state) => state.items);
  const elementEdit = (id) => () => {
    dispatch(editThisItem("http://localhost:3001/admin/clients/new", id));
  };
  const cardDelete = (id) => () => {
    dispatch(deleteThisItem("http://localhost:3001/admin/clients", id));
  };
  const handleChange = (panel) => (event, isExpanded) => {
    if (event.target?.id !== panel) {
      setExpanded(isExpanded ? panel : false);
    }
  };

  useEffect(() => {
    dispatch(allDeletedClients());
  }, []);

  return (
    <Grid
    container
    direction="column-reverse"
    justifyContent="space-between"
    alignItems="stretch"
    >
      <div  className={classes.root}>
        {items?.map((e) => (
          <Accordion
          style={{minHeight: "70px"}}
            expanded={expanded === e._id}
            onChange={handleChange(e._id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}
              style={{fontSize:"20px"}}
              >
               {e.surname} {e.name} {e.patronymic}
              </Typography>
                <Typography 
                style={{paddingLeft:"20px", fontSize:"18px"}}
                >
                  Телефон: {e.phone}
                </Typography>

              <Typography className={classes.heading } style={{paddingLeft:"20px", fontSize:"18px"}}>
              e-mail: {e.email}
              </Typography>
  
            </AccordionSummary>
            <AccordionDetails>
              <div id="remove">
                <IconButton>

                <CachedIcon
                fontSize="large"
                onClick={elementEdit(e._id)}
                className={classes.margin}
                ></CachedIcon>
                </IconButton>
              </div>
              <div id="delete">
                <IconButton
                  onClick={cardDelete(e._id)}
                  id="delete"
                  aria-label="delete"
                  className={classes.margin}
                >
                  <DeleteIcon fontSize="large"
                   />
                </IconButton>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Grid>
  );
}
