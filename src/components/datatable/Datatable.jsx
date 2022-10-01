import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows, productColumns, restaurantColumns, categoryColumns, driverColumns, orderColumns, restaurantsEarningsColumns} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getCategories, getEarnings, getFoods, getRestaurantsFromFirebase, getUsersFromFirebase} from "../../firebase";
import { decryptData, encryptData } from "../../utils";
import { RestaurantContext } from "../../context/RestaurantContext";
import { DotLoader } from "react-spinners";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';

const Datatable = ({type}) => {
 const { confirm } = Modal;
 const {currentRestaurant} = useContext(RestaurantContext) 
 const [tab, setTab] = useState({})
 const [title, setTitle] = useState()
  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        handleDelete(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const handleDelete = (id) => {
    setTab({
      rows: tab.rows.filter(item => item.id !== id),
      columns: tab.columns
    })
  };
  const actionColumn = [
    {
      field: "action",
      headerName:  <b>Action</b>,
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
           {type !== "earnings"?<Link to={`/${type}/${(((type==="users" || type === "drivers") && params.row.userId ) || (type === "restaurants" && params.row.restaurantId) ) || params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>:<></>}
            <div
              className="deleteButton"
              onClick={() => showDeleteConfirm(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  useEffect(()=>{
    (async ()=>{
    if(!localStorage.getItem(process.env.REACT_APP_USERS_KEY))
    await getUsersFromFirebase().then(users => localStorage.setItem(process.env.REACT_APP_USERS_KEY, encryptData(users)))
    if(!localStorage.getItem(process.env.REACT_APP_EARNINGS_KEY))
    await getEarnings().then(restaurantsEarnings => localStorage.setItem(process.env.REACT_APP_EARNINGS_KEY, encryptData(Object.keys(restaurantsEarnings).map((restaurant, index) => ({id: index, restaurant:restaurant, earning:restaurantsEarnings[restaurant], adminCommission: restaurantsEarnings[restaurant], percentage: 25}) ))))
    switch (type) {
      case "products":
        setTitle("Menu")
      if(!localStorage.getItem(process.env.REACT_APP_PRODUCTS_KEY))
       getFoods().then(foods => localStorage.setItem(process.env.REACT_APP_PRODUCTS_KEY, encryptData(foods)))
       .then(foods => setTab({
        rows: foods.filter(product => product.restaurantID === currentRestaurant.restaurantId),
        columns: productColumns
      }))
      else{
        setTab({
          rows: decryptData(localStorage.getItem(process.env.REACT_APP_PRODUCTS_KEY)),
          columns: productColumns
        })
      }
      break
      case "transactions":
        setTitle("Transactions")
        setTab({
          rows: decryptData(localStorage.getItem(process.env.REACT_APP_ORDERS_KEY)).filter(order => order.status === "Completed" ),
          columns: orderColumns
        })
        break
        case "orders":
        setTitle("Orders")
        setTab({
          rows: decryptData(localStorage.getItem(process.env.REACT_APP_ORDERS_KEY)),
          columns: orderColumns
        })
        break
      case "drivers":
        setTitle("Driver")
        setTab({
          rows: decryptData(localStorage.getItem(process.env.REACT_APP_USERS_KEY)).filter(user => user.Role === "driver"),
          columns: driverColumns
        })
        break
      case "restaurants":
        setTitle("Restaurant")
        getRestaurantsFromFirebase().then(restaurants => {
          setTab({
            rows: restaurants,
            columns: restaurantColumns
          })
        })
      break
      case "categories":
        setTitle("Category")
        getCategories().then(categories => {
          setTab({
            rows: categories.sort((a,b) => b.createdAt.seconds - a.createdAt.seconds),
            columns: categoryColumns
          })
        })
      break
      case "earnings":
        setTitle("Earnings")
        console.log( decryptData(localStorage.getItem(process.env.REACT_APP_EARNINGS_KEY)))
        setTab({
          rows: decryptData(localStorage.getItem(process.env.REACT_APP_EARNINGS_KEY)),
          columns: restaurantsEarningsColumns
        })
      break
      default:
        setTitle("User")
        setTab({
          rows: decryptData(localStorage.getItem(process.env.REACT_APP_USERS_KEY)),
          columns: userColumns
        })
    } 
  })();
  }, [])
   if (!tab.columns)
   return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <DotLoader color={"#36D7B7"} loading={true}  size={150} />
    </div>
  return (
    <div className="datatable">
      <div className="datatableTitle">
      {type === "earnings" || type === "orders" ?null:"Add New"} {title}
        {type === "earnings"|| type === "orders"?null:<Link to={`/${type}/new`} className="link">
          Add New
        </Link>}
      </div>
      <DataGrid
        className="datagrid"
        rows={tab.rows}
        columns={tab.columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};
export default Datatable;
