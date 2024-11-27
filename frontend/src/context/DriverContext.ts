import  { createContext} from "react";





  interface DriverState {
  [x: string]: any;
  name: string;
  driver_id: number;
  description: string;
  car_model: string;
  rating: number;
  avaliation: string[];
  price_per_rate: number;
  rate: number;
  user_id: number;
  }
  
  interface Location {
    lat: string;
    lng: string;
  }
  
  const locations: Location = {lat: '', lng: ''};
  
  const initialState: DriverState = {
    name: '',
    driver_id: 0,
    description: '',
    car_model: '',
    rating: 0,
    avaliation: [],
    price_per_rate: 0,
    rate: 0,
    user_id: 0,

    
  };

export const INITIAL_DATA = {
    filterDrivers: initialState,
    dataDistance: "",
    dataDurantion: "",
    start_location: locations,
    end_location: locations,
    time: "",
    user_id: 0
}




export const DriverContext = createContext({
    state: INITIAL_DATA,
});




