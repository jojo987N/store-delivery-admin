 import Sidebar from "../../components/sidebar/Sidebar";
 import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
 import Widget from "../../components/widget/Widget";
 import Featured from "../../components/featured/Featured";
 import Chart from "../../components/chart/Chart";
 import Table from "../../components/table/Table";
import List from "../../components/table/Table";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import Barchart from "../../components/barChart/Barchart";
import PieChartt from "../../components/pieChart/PieChart";

const Home = () => {
  const {currentStore} = useContext(StoreContext)
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
           {currentStore?<Widget type="confirmed-order" />:<Widget type="user" />}
           {currentStore?<Widget type="cooking-order" />:<Widget type="order" />}
          <Widget type="earning" />
          {currentStore?<Widget type="ready-for-pickup-order" />:<Widget type="driver" />}
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