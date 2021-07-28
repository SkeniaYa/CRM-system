
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
const useStyles = makeStyles((theme) => ({

  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BlocktoShowElemensToDelete() {
  const arr = null
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge color="secondary" variant={arr ? "dot" : "none"}>
        <MailIcon />
        <div>
          Клиенты
        </div>
      </Badge>
      <Badge color="secondary" variant="dot">
        <MailIcon />
        <div>
          Заказы
        </div>
      </Badge>
      
      
    </div>
  );
}
