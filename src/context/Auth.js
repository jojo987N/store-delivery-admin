import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { auth, getRestaurantById } from '../firebase';
import { RestaurantContext } from './RestaurantContext';
import { LoadingContext } from './LoadingContext';
import { countDown } from '../components/navbar/Navbar';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const { setCurrentRestaurant } = useContext(RestaurantContext)
    const { setLoading } = useContext(LoadingContext)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user) 
        })
    }, [])
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}