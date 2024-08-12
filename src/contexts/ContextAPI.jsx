import React, { createContext, useState } from 'react'
export const addResponseContext = createContext()
export const editResponesContext = createContext()

function ContextAPI({children}) {
    const [addResponse , setAddResponse] = useState("")
    const [editRespones , setEditRespones] = useState("")
  return (
    <>
        <addResponseContext.Provider value={{addResponse,setAddResponse}}>
          <editResponesContext.Provider value={{editRespones,setEditRespones}}>
              {children}
          </editResponesContext.Provider>
        </addResponseContext.Provider>
    </>
  )
}

export default ContextAPI