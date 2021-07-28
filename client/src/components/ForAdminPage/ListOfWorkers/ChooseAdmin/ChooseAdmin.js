import {Typography,CardContent} from '@material-ui/core';
import React, { useEffect } from 'react';
import { red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import { allworkers, changeAdmin } from '../../../../redux/actions/workers.action';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});



export default function ChooseAdmin(props){
  const {isAdmin, id} = props
  const dispatch = useDispatch()
  const ChangeAdmin=async(e)=>{
    e.preventDefault();
    const idcard = e.target.id;

    const response = await fetch(`http://localhost:3001/admin/workers/add/${idcard}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        idcard,
      }),
      credentials: "include",
    });
    const result = await response.json();
    await dispatch(changeAdmin(result))
  }
  

  // return(
//     <CardContent>
//     <Typography  variant="body2" color="textSecondary" component="p">
//       {isAdmin ?  "Администратор" : "Пользователь"}
//       <FormControlLabel
//     control={<IOSSwitch  id={id}  onChange={ChangeAdmin} name="checkedB" />}
//     label="Назначить администратором"
//   />
//   </Typography>
// </CardContent>
  // )
}
