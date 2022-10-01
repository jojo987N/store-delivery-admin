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
  
  };
  export const firebaseApp = initializeApp(firebaseConfig);
  export const auth = getAuth(firebaseApp)
  export const db = getFirestore()
  export const restaurantsCol = collection(db, 'restaurants')
  export const categoriesCol = collection(db, 'categories')
  export const ordersCol = collection(db, 'orders')
  export const usersCol = collection(db, 'users')
  export const getRestaurantsFromFirebase = () => {
    const restos = []
    return getDocs(restaurantsCol)
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
 export const getFoods = ()=>{
  const foods=[]
  const q= query(productsCol, orderBy('createdAt', 'desc'))
  return getDocs(q).then(snapshot=>{
     snapshot.docs.forEach((doc) => {
        foods.push({...doc.data(), id: doc.id })
      })
      return foods
  })
 }
 const addProducts = () => {
  getDocs(restaurantsCol)
    .then(snapshot => snapshot.docs.forEach((doc) => {
      doc.data().dishes.forEach((dishe) => {
        if('name' in dishe)
        addDoc(productsCol, {
          restaurantID: doc.id,
          ...dishe ,
          createdAt: serverTimestamp()      
        }).then(()=>console.log("ADDED"))
      })
    }))
}
export const addProduct = (name, description, price) => {
  return addDoc(productsCol, {
    restaurantID: auth.currentUser?.uid,
    name,
    description,
    price,
    createdAt: serverTimestamp()      
  }) 
}
export const addRestaurant = (inputs) => {
  addDoc(restaurantsCol, {
    ...inputs
  })
}
export const addCategory = (data) => {
  return addDoc(categoriesCol, {
    ...data,
    createdAt: serverTimestamp()      
  }) 
}
export const getRestaurantById = (uid)=>{
  const q= query(restaurantsCol, where('managerId', '==', uid))
  return getDocs(q).then((snapshot) => {
    if(snapshot.docs[0])
    return {...snapshot.docs[0].data(), restaurantId: snapshot.docs[0].id}
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
  return getDocs(restaurantsCol)
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
    a[v.Restaurant.name] = (a[v.Restaurant.name] || 0 ) + v.User.items.reduce((a,v)=> a + v.price, 0) 
    return a
   },{})
  }
   )}
