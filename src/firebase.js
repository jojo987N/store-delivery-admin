import {initializeApp} from 'firebase/app'
import {addDoc, getFirestore, collection, getDocs, doc, deleteDoc, orderBy, query, limit,
where, onSnapshot, serverTimestamp, updateDoc, Timestamp} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

 const firebaseConfig = {

  apiKey: {/* Your firebase config here */},
  
  authDomain: {/* Your firebase config here */},

  projectId: {/* Your firebase config here */},

  storageBucket: {/* Your firebase config here */},

  messagingSenderId: {/* Your firebase config here */},

  appId: {/* Your firebase config here */},

  apiKey: "AIzaSyDgDMdmkB50rwTRdaMXL4fAdcgYksET2-s",
  authDomain: "store-delivery-43cb0.firebaseapp.com",
  projectId: "store-delivery-43cb0",
  storageBucket: "store-delivery-43cb0.appspot.com",
  messagingSenderId: "283406701144",
  appId: "1:283406701144:web:d05dbea3aded6c00d5b02d"

  
  };
  export const firebaseApp = initializeApp(firebaseConfig);
  export const auth = getAuth(firebaseApp)
  export const db = getFirestore()
  export const storesCol = collection(db, 'stores')
  export const categoriesCol = collection(db, 'categories')
  export const ordersCol = collection(db, 'orders')
  export const usersCol = collection(db, 'users')
  export const getStoresFromFirebase = () => {
    const restos = []
    return getDocs(storesCol)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
         if(doc)
         restos.push({
          id: doc.id,
           ...doc.data()
         })
        })
        return restos
      })
  }
  export const getOrders = (setOrders)=>{
    const orders = []
    const unsuscribe = onSnapshot(ordersCol, (snapshot)=>{
      snapshot.docs.forEach((doc)=>{
       orders.push(doc.data())
      })
       setOrders(orders)
    })
  }
 export const getOrdersFromFirebase = ()=>{
  const orders=[]
  return getDocs(ordersCol).then(snapshot=>{
     snapshot.docs.forEach((doc) => {
        orders.push({...doc.data(), id: doc.id})
      })
      return orders?orders:[]
  })
 }
 export const getOrdersFromFirebaseQuery = ()=>{
  const orders=[]
  return getDocs(ordersCol).then(snapshot=>{
     snapshot.docs.forEach((doc) => {
        orders.push({...doc.data(), id: doc.id})
      })
      return orders
  })
 }
export const productsCol = collection(db, 'products')
 export const getProducts = ()=>{
  const products=[]
  const q= query(productsCol, orderBy('createdAt', 'desc'))
  return getDocs(q).then(snapshot=>{
     snapshot.docs.forEach((doc) => {
        products.push({...doc.data(), id: doc.id })
      })
      return products
  })
 }
 const addProducts = () => {
  getDocs(storesCol)
    .then(snapshot => snapshot.docs.forEach((doc) => {
      doc.data().dishes.forEach((dishe) => {
        if('name' in dishe)
        addDoc(productsCol, {
          storeID: doc.id,
          ...dishe ,
          createdAt: serverTimestamp()      
        }).then(()=>console.log("ADDED"))
      })
    }))
}
export const addProduct = (name, description, price) => {
  return addDoc(productsCol, {
    storeID: auth.currentUser?.uid,
    name,
    description,
    price,
    createdAt: serverTimestamp()      
  }) 
}
export const addStore = (inputs) => {
  addDoc(storesCol, {
    ...inputs
  })
}
export const addCategory = (data) => {
  return addDoc(categoriesCol, {
    ...data,
    createdAt: serverTimestamp()      
  }) 
}
export const getStoreById = (uid)=>{
  const q= query(storesCol, where('managerId', '==', uid))
  return getDocs(q).then((snapshot) => {
    if(snapshot.docs[0])
    return {...snapshot.docs[0].data(), storeId: snapshot.docs[0].id}
  })
}
export const updateOrder = (order_Id, status, deliveryTime)=>{
  const docRef = doc(db, 'orders', order_Id)
  updateDoc(docRef, {
    status: status,
    deliveryTime: deliveryTime
  })
  .then(()=> console.log('good'))
}
export const updateProduct = (product_id, image)=>{
  const docRef = doc(db, 'products', product_id)
  updateDoc(docRef, {
    image: image,
  })
  .then(()=> console.log('good'))
}
const getOrder = ()=>{
  getDocs(ordersCol)
  .then(snapshot => {
    console.log(snapshot.docs[0].data())
  })
}
export const getCategoriesTest = () => {
  const categories = []
  return getDocs(storesCol)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        doc.data().categories.forEach(categorie =>{
          console.log(categorie.title)
         categories.push(categorie.title)
        })
      })
      return categories
    })
}
export const getCategories = ()=>{
  const categories=[]
  return getDocs(categoriesCol).then(snapshot=>{
     snapshot.docs.forEach((doc) => {
       categories.push({...doc.data(), id: doc.id })
      })
      return categories
  })
 }
export const getUsersFromFirebase = () => {
  const users = []
  return getDocs(usersCol)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
       users.push({
         userId: doc.id,
         ...doc.data()
       })
      })
      return users
    })
}
export const getUsersRoleFromFirebase = () => {
  const users = []
  const q= query(usersCol, where('Role', '==', "admin"))
  return getDocs(usersCol)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
       users.push({
         userId: doc.id,
         ...doc.data()
       })
      })
      return users
    })
}
export const updateUsersFromFirebase = () => {
  return getDocs(usersCol)
    .then((snapshot) => {
      snapshot.docs.forEach((docc) => {
       updateDoc(doc(db, 'users', docc.id), {
        Status: "active",
      })
      .then(()=> console.log('good'))
      })
    })
}
export const updateUser = async (state, itemId) => {
  updateDoc(doc(db, 'users', itemId), {
    ...state
  })
}
export const updateDriversFromFirebase = () => {
  const q= query(usersCol, where('Role', '==', "driver"))
  return getDocs(q)
    .then((snapshot) => {
      snapshot.docs.forEach((docc) => {
       updateDoc(doc(db, 'users', docc.id), {
        driverStatus: ["online", "offline"][Math.floor(Math.random()*2)],
      })
      .then(()=> console.log('good'))
      })
    })
}
export const updateOrdersFromFirebase = ()=>{
  return getDocs(ordersCol).then(snapshot=>{
     snapshot.docs.forEach((docc) => {
        updateDoc(doc(db, 'orders', docc.id), {
          orderType: ["pickup", "delivery"][Math.floor(Math.random()*2)],
        })
        .then(()=> console.log('good'))
      })
  })
 }
 export const getEarnings = ()=>{
   return getOrdersFromFirebase()
   .then(orders => {
   return orders.reduce((a, v, i)=>{
    a[v.Store.name] = (a[v.Store.name] || 0 ) + v.User.items.reduce((a,v)=> a + v.price, 0) 
    return a
   },{})
  }
   )}
