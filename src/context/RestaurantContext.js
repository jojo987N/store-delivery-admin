import React, { createContext, useEffect, useState } from 'react'

export const RestaurantContext = createContext();

export const RestaurantProvider = ({children})=> {

    const [currentRestaurant, setCurrentRestaurant] = useState(null)

    return (
        <RestaurantContext.Provider value={{currentRestaurant, setCurrentRestaurant}}>
          {children}
        </RestaurantContext.Provider>
    )

}