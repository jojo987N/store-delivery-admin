import { decryptData } from "./utils";


export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: <b>User</b>,
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={"https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png"} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: <b>Email</b>,
    width: 250,
  },

  {
    field: "phone",
    headerName: <b>Phone</b>,
    width: 150,
  },
  {
    field: "Role",
    headerName: <b>Role</b>,
    width: 100,
  },
  {
    field: "status",
    headerName: <b>Status</b>,
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.Status}`}>
          {params.row.Status}
        </div>
      );
    },
  },
];

export const productColumns = [
  {
    field: "menu",
    headerName: <b>Menu</b>,
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "store",
    headerName: <b>Store</b>,
    width: 230,
    renderCell: (params) => {

      return (
        <div className="cellWithStore">

          {decryptData(localStorage.getItem(process.env.REACT_APP_STORES_KEY)).find(store => store.storeId === params.row.storeID).name}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: <b>Price</b>,
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithPrice">
          {params.row.price.toLocaleString('en', {
            style: "currency",
            currency: 'USD'
          })}
        </div>
      );
    },
  },
  {
    field: "category",
    headerName: <b>Category</b>,
    width: 230,
    renderCell: (params) => {

      return (
        <div className="cellWithStore">
          {decryptData(localStorage.getItem(process.env.REACT_APP_CATEGORIES_KEY)).find(category => category.id === params.row.categorieId).name}
        </div>
      );
    },
  },
];

export const storeColumns = [
  {
    field: "store",
    headerName: <b>Store</b>,
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "phone",
    headerName: <b>Phone</b>,
    width: 230,
  },

  {
    field: "address",
    headerName: <b>Address</b>,
    width: 350,
    renderCell: (params) => {
      return (
        <div className="cellWithAddress">
          {params.row.address}
        </div>
      );
    },
  },
];

export const categoryColumns = [
  {
    field: "category",
    headerName: <b>Category</b>,
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: <b>Name</b>,
    width: 250,
  },
  {
    field: "type",
    headerName: <b>Type</b>,
    width: 300,
    renderCell: (params) => {
      return (
        <div className="cellWithStore">
          {params.row.type?params.row.type:"store"}
        </div>
      );
    },
  },


];


export const driverColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "driver",
    headerName: <b>Driver</b>,
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={"https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png"} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: <b>Email</b>,
    width: 250,
  },

  {
    field: "phone",
    headerName: <b>Phone</b>,
    width: 150,
  },
  {
    field: "status",
    headerName: <b>Status</b>,
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithDriverStatus ${params.row.driverStatus}`}>
          {params.row.driverStatus}
        </div>
      );
    },
  },
];

export const orderColumns = [
  {
    field: "orderId",
    headerName: <b>{"orders ID"}</b>,
    width: 100,
    renderCell: (params) => params.row.orderId.toUpperCase(),
  },
  {
    field: "customer",
    headerName: <b>Customer</b>,
    width: 180,
    renderCell: (params) => {
      return (
        <div >

          {params.row.User.name}
        </div>
      );
    },
  },
  {
    field: "store",
    headerName: <b>Store</b>,
    width: 230,
    renderCell: (params) => {
      return (
        <div >

          {params.row.Store.name}
        </div>
      );
    },
  },

  {
    field: "amount",
    headerName: <b>Amount</b>,
    width: 150,
    renderCell: (params) => {
      return (
        <div >

          {params.row.User.items.reduce((a, v) => a + v.price, 0).toLocaleString('en', {
            style: "currency",
            currency: 'USD'
          })}
        </div>
      );
    },
  },
  {
    field: "orderType",
    headerName: <b>Order Type</b>,
    width: 100,
  },
  {
    field: "status",
    headerName: <b>Status</b>,
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithOrderStatus ${params.row.status}`}>
          {params.row.status.toLowerCase()}
        </div>
      );
    },
  },
];

export const storesEarningsColumns = [
  {
    field: "store",
    headerName: <b>Store</b>,
    width: 300,
  },
  {
    field: "earning",
    headerName: <b>Earning</b>,
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithEarning">
          {params.row.earning.toLocaleString('en', {
            style: "currency",
            currency: 'USD'
          })}
        </div>
      );
    },
  },
  {
    field: "adminCommission",
    headerName: <b>Admin Commission</b>,
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithEarning">
          {(params.row.earning * 20 / 100).toLocaleString('en', {
            style: "currency",
            currency: 'USD'
          })}
        </div>
      );
    },
  },
  {
    field: "percentage",
    headerName: <b>Percentage</b>,
    width: 170,
    renderCell: (params) => {
      return (
        <div className="cellWithEarning">
          <span  >20</span>
        </div>
      );
    },
  },

];


const coupons = [
  {
    image: '',
    title: '',
    fixPrice: '',
    percentage: '',
    espireAt: ''
  }
]



