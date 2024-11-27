import { DriverContext } from './DriverContext';
import { useContext } from "react";


export function useDriverContext() {
    
    const context = useContext(DriverContext);
    
    return context;
}