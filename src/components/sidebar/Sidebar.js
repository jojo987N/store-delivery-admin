import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { StoreContext } from "../../context/StoreContext";
import { useContext, useState } from "react";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { SelectedKeyContext } from "../../context/SelectedKey";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const Sidebar = ({ type }) => {
  console.log("type : ", "/" + type);
  const { currentStore } = useContext(StoreContext);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { selectedKey, setSelectedKey } = useContext(SelectedKeyContext);
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
      })
      .catch((err) => console.log(err.code));
  };
  const items = [
    getItem("Dashboard", "/", <DashboardIcon />),
    getItem("Users", "sub", <PersonOutlineIcon className="icon" />, [
      getItem("Users List", "/users"),
      getItem("Add User", "/users/new"),
    ]),
    getItem("Menus", "sub0", <StoreIcon className="icon" />, [
      getItem("Menus List", "/products"),
    ]),
    getItem("Orders", "sub1", <CreditCardIcon className="icon" />, [
      getItem("Orders List", "/orders"),
    ]),
    getItem("Drivers", "sub2", <LocalShippingIcon className="icon" />, [
      getItem("Drivers List", "/drivers"),
      getItem("Add Driver", "/drivers/new"),
    ]),
    getItem("Stores", "sub3", <StoreIcon className="icon" />, [
      getItem("Stores List", "/stores"),
      getItem("Add Store", "/stores/new"),
    ]),
    getItem("Categories", "sub4", <CategoryIcon className="icon" />, [
      getItem("Categories List", "/categories"),
      getItem("Add Category", "/categories/new"),
    ]),
    getItem("Profile", "sub5", <AccountCircleOutlinedIcon className="icon" />, [
      getItem("Update Profile", "/users/profile"),
    ]),
    getItem("Earnings", "/earnings", <MonetizationOnOutlinedIcon />),
    getItem("Transactions", "/transactions", <PaymentsIcon />),
    getItem("Logout", "/logout", <ExitToAppIcon className="icon" />),
  ];
  const onClick = (e) => {
    console.log("click ", e);
    if (e.key !== "/logout") navigate(e.key);
    else signOutUser();
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            className="cellImg"
            style={{ width: 100, height: 100 }}
            src={require("../../assets/images/logo-100-removed.png")}
            alt="avatar"
          />
        </Link>
      </div>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default Sidebar;
