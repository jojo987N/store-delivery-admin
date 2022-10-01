import React, { createContext, useEffect, useState } from 'react'

export const SelectedKeyContext = createContext();

export const SelectedKeyProvider = ({children})=> {

    const [selectedKey, setSelectedKey] = useState('1')

    return (
        <SelectedKeyContext.Provider value={{selectedKey, setSelectedKey}}>
          {children}
        </SelectedKeyContext.Provider>
    )

}