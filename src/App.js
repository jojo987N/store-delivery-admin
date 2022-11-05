import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { decryptData, encryptData } from "./utils";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { carInputs, categoryProductInputs, categoryInputs, productInputs, storeInputs, userInputs } from "./formSource";
import { auth, getOrdersFromFirebase } from './firebase'
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { OrdersContext } from "./context/OrdersContext"
import { AuthProvider } from "./context/Auth";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { StoreProvider } from "./context/StoreContext";
import { LoadingProvider } from "./context/LoadingContext";
import { AuthContext } from "./context/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { SelectedKeyProvider } from "./context/SelectedKey";
import Settings from "./pages/settings/Settings";
import "antd/dist/antd.min.css"

const ProtectedRoute = ({ currentUser }) => {
  if (!currentUser)
    return <Navigate to={"/"} replace />
  return <Outlet />
}
const ProtectedRoute1 = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user)
      return <Navigate to={"/"} replace />
  })
  return <Outlet />
}
function App() {
  const { currentUser } = useContext(AuthContext)
  const [ordersData, setOrdersData] = useState([])
  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_ORDERS_KEY)) {
      getOrdersFromFirebase().then(orders => localStorage.setItem(process.env.REACT_APP_ORDERS_KEY, encryptData(orders)))
        .then(orders => setOrdersData(orders))
    } else {
      setOrdersData(decryptData(localStorage.getItem(process.env.REACT_APP_ORDERS_KEY)))
    }
  }, [])
  return (
    <div className="app">
      <SelectedKeyProvider>
        <OrdersContext.Provider value={{ ordersData, setOrdersData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={
                  <PrivateRoute />
                } />
                <Route path="login" element={<Login />} />
                <Route element={<ProtectedRoute currentUser={currentUser} />}>
                  <Route path="users">
                    <Route index element={<List key="users" type="users" />} />
                    <Route path=":userId" element={<New inputs={userInputs} type="user" title="Update User" />} />
                    <Route
                      path="new"
                      element={<New inputs={userInputs} type="user" title="Add New User" />}
                    />
                  </Route>
                  <Route path="products">
                    <Route index element={<List key="products" type="products" />} />
                    <Route path=":id" element={<New inputs={productInputs} type="product" title="Update " />} />
                    <Route
                      path="new"
                      element={<New inputs={productInputs} type="products" title="Add New Product" />}
                    />
                  </Route>
                  <Route path="orders">
                    <Route index element={<List key="orders" type="orders" />} />
                    <Route path=":orderId" element={<Single type="orders" />} />
                    <Route
                      path="new"
                      element={<New inputs={productInputs} type="orders" title="Add New Order" />}
                    />
                  </Route>
                  <Route path="stores">
                    <Route index element={<List key="stores" type="stores" />} />
                    <Route path=":storeId" element={<New inputs={storeInputs} type="stores" title="Update Store" />} />
                    <Route
                      path="new"
                      element={<New inputs={storeInputs} type="stores" title="Add New Store" />}
                    />
                  </Route>
                  <Route path="drivers">
                    <Route index element={<List key="drivers" type="drivers" />} />
                    <Route path=":userId" element={<New inputs={[...userInputs, ...carInputs]} type="drivers" title="Update Driver" />} />
                    <Route
                      path="new"
                      element={<New inputs={[...userInputs, ...carInputs]} type="drivers" title="Add New Driver" />}
                    />
                  </Route>
                  <Route path="categories">
                    <Route index element={<List key="categories" type="categories" />} />
                    <Route path=":id" element={<New inputs={categoryInputs} type="categorie" title="Update Category" />} />
                    
                    <Route
                      path="new"
                      element={<New inputs={categoryInputs} type="categories" title="Add New Category" />}
                    />
                  </Route>
                  <Route path="earnings">
                    <Route index element={<List key="earnings" type="earnings" />} />
                  </Route>
                  <Route path="settings">
                    <Route index element={<Settings key="settings" type="settings" />} />
                  </Route>
                  <Route path="transactions">
                    <Route index element={<List key="transactions" type="transactions" />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </OrdersContext.Provider>
      </SelectedKeyProvider>
    </div>
  );
}
export default App;