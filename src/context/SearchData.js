import { createContext, useState } from "react"

export const SearchDataContext = createContext(" ")
export default function SearchData({children}) {
    const[search,setSearch] =useState("");
    // const[da,setDa] =useState('');
    return <SearchDataContext.Provider value={{search,setSearch}}>
        
        {children}
        </SearchDataContext.Provider>
    
}
