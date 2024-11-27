import { ReactNode } from "react";
import { DriverContext, INITIAL_DATA } from "./DriverContext";
import React from "react";

interface IProps {
    children: ReactNode;
}

export default function DataContextProvider({children}: IProps) {
 
 
    return <DriverContext.Provider value={{state: INITIAL_DATA}}>
                {children}
            </DriverContext.Provider>;
}