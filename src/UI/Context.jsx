//Creatin a warehouse for providing data to other components
import { createContext, useContext } from "react"

export const UserContext = createContext();

export const useCustomContext = () => {   //Create a custom context hook for accessing the context data
    const GetContextData = useContext(UserContext);
    return GetContextData;
}