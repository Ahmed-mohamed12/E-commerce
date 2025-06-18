import { createContext, useState } from "react"

export const Menue = createContext(" ")
export default function MenuContext({children}) {
    const[isOpen,setIsOpen] =useState(true)
    return <Menue.Provider value={{isOpen,setIsOpen}}>
        
        {children}
        </Menue.Provider>
    
}
