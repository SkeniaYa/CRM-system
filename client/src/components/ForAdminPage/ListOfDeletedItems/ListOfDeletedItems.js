import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CachedIcon from '@material-ui/icons/Cached';
import React from "react";
import {
  Grid,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Accordion,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  allDeletedItems,
  allDeletedOrders,
  deleteThisItem,
  deleteThisOrder,
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

export default function ListOfDEletedItems() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const items = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(allDeletedOrders());
  }, [dispatch]);

  const cardDelete = (id) => (event) => {
    dispatch(deleteThisItem("http://localhost:3001/admin/orders",id));
  };
  const elementRemove = (id) => (event) => {
    dispatch(editThisItem('http://localhost:3001/admin/orders/new',id));
  };
  const handleChange = (panel) => (event, isExpanded) => {
    if (event.target?.id !== panel) {
      setExpanded(isExpanded ? panel : false);
    }
  };

  return (
    <Grid
      container
      direction="column-reverse"
      justifyContent="space-between"
      alignItems="stretch"
      >
      <div className={classes.root}>
        {items?.map((e) => (
          <Accordion
          expanded={expanded === e?._id}
          onChange={handleChange(e?._id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <Typography className={classes.heading}
              style={{fontSize:"20px"}}
              >
               <p>
                  Номер заказа: {e?.number}
                 </p>
                 <p>

                 Клиент: {e?.client?.surname} {e?.client?.name} {e?.client?.patronymic}
                 </p>
              </Typography>
              <Typography className={classes.secondaryHeading}
              style={{fontSize:"18px"}}
              >
               <p>
                  Дата доставки: {e?.dateDeliv}
                 </p> 
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div id="delete">
                <IconButton
                  onClick={cardDelete(e?._id)}
                  id="delete"
                  aria-label="delete"
                  className={classes.margin}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
                <CachedIcon
                fontSize="large"
                  onClick={elementRemove(e._id)}
                  id="remove"
                  className={classes?.margin}
                >
                </CachedIcon>
              </div>
              <Typography>{e?.phone}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Grid>
  );
}
