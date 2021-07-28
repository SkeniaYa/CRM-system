import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import "./Header.css";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {
  AppBar,
  Avatar,
  Tabs,
  Tab,
  Typography,
  Box,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LongMenu from "./AdminsHeader/AdminsHeader";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export function SimpleSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
}

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const userName = useSelector((state) => state.user?.name);
  const userPicture = useSelector((state) => state.user?.picture);
  const userIsAdmin = useSelector((state) => state.user?.isAdmin);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}
    style={{width:"100%"}}
    >
      <AppBar position="static" style={{ background: "linear-gradient(0deg, rgba(11,29,38,1) 6%, rgba(14,60,69,1) 83%)" }}>
        <Container maxWidth="lg">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            // textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {/* <Tab label="на главную" component={Link} to="/" {...a11yProps(0)} /> */}
            <Tab
              style={{ fontSize: "18px" }}
              label="клиенты"
              component={Link}
              to="/clients"
              {...a11yProps(0)}
            />
            <Tab
              style={{ fontSize: "18px" }}
              label="заказы"
              component={Link}
              to="/orders"
              {...a11yProps(1)}
            />
            <Tab
              style={{ fontSize: "18px" }}
              label="добавить клиента"
              component={Link}
              to="/clients/new"
              {...a11yProps(2)}
            />
            {/* <Tab
              label="создать заказ"
              component={Link}
              to="/orders/new"
              {...a11yProps(2)}
            /> */}
            {/* <Tab
              label="создать заказ"
              component={Link}
              to="/orders/new"
              {...a11yProps(3)}
              />
              <Tab
              label="удаленные клиенты"
              component={Link}
              to="/admin/clients"
              {...a11yProps(4)}
            /> */}
            {/* <Tab
              label="удаленные заказы"
              component={Link}
              to="/admin/items"
              {...a11yProps(5)}
            /> */}

            {userIsAdmin && (
              <Tab
                style={{ fontSize: "18px" }}
                label="сотрудники"
                component={Link}
                to="/admin/workers"
                {...a11yProps(6)}
              />
            )}
            {userName && (
              <div className="userInfo"
              style={{
                alignItems:"center",
                justifyContent:"space-between",
                marginLeft: "auto",
                width: "330px",
                
              }}>
                {userIsAdmin && <LongMenu
                 />}
                <div style={{
                  width:"100px"
                }}>
                <Avatar
                  alt={userName}
                  src={userPicture}
                  className={classes.large}
                  />
                </div>
                  <b>{userName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>{" "}
                  <IconButton
                  style={{paddingRight:"0px"}}
                    to="/auth/signout"
                    label="выйти"
                    component={Link}
                    {...a11yProps(3)}
                    >

                <ExitToAppIcon
                style={{
                  marginTop:"0px",
                  marginLeft:"2px",
                  color:"white"
                  
                }}
                fontSize="large"
                
                />
                  </IconButton>
              </div>
            )}
            </Tabs>
            </Container>
      </AppBar>
    </div>
  );
}
