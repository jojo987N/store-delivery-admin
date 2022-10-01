 import Sidebar from "../../components/sidebar/Sidebar";
 import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
 import Widget from "../../components/widget/Widget";
 import Featured from "../../components/featured/Featured";
 import Chart from "../../components/chart/Chart";
 import Table from "../../components/table/Table";
import List from "../../components/table/Table";
import { RestaurantContext } from "../../context/RestaurantContext";
import { useContext } from "react";
import Barchart from "../../components/barChart/Barchart";
import PieChartt from "../../components/pieChart/PieChart";

const Home = () => {
  const {currentRestaurant} = useContext(RestaurantContext)
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
           {currentRestaurant?<Widget type="confirmed-order" />:<Widget type="user" />}
           {currentRestaurant?<Widget type="cooking-order" />:<Widget type="order" />}
          <Widget type="earning" />
          {currentRestaurant?<Widget type="ready-for-pickup-order" />:<Widget type="driver" />}
        </div>
        <div className="charts">
          <Featured />
          <Barchart />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <List />
         </div>
      </div>
     </div>
  );
};
export default Home;