import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { OrdersContext } from "../../context/OrdersContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { flexbox } from "@mui/system";

  const Single = ({type}) => {
  const {ordersData} = useContext(OrdersContext)
  const {orderId} = useParams()
  const orderData = ordersData.find(order => order.id === orderId)
  return (
    <>
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">{type === "orders" && "Store"}</h1>
            <div className="item">
              <img
                src={type === "orders" && orderData.User.items[0].store.image_url}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h2 className="itemTitle">{type === "orders" && orderData.User.items[0].store.name}</h2>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{type === "orders" && orderData.User.items[0].store.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                  {type === "orders" && orderData.User.items[0].store.location.display_address.reduce((a, v) => a + v , "")}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
            </div>
          <div className="right">
            {type === "orders" && <List type={type}/>}
          </div>
        </div>
      </div>
    </div>
     </>
  );
};
const styles = {
  buttons: {
  },
  button1 : {
    backgroundColor: "red",
    marginRight: 5
  },
  button2: {
    backgroundColor: "green",
    marginLeft: 2
  },
  button3: {
    width: '100%',
    backgroundColor: "#4dff4d",
  }
}
export default Single;
