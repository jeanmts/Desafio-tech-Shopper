import './styles.css'

import { useEffect, useState } from 'react';
import { useDriverContext } from '../../context/DriverHook';
import api from '../../services/api';
import {  useNavigate } from "react-router-dom";
import React from 'react';


interface CardDriverProps {
  name: string;
  driver_id: number;
  description: string;
  car_model: string;
  rating: number;
  avaliation: string[];
  dataDistance: string;
  price_per_rate: number;
  rate: number;
}




function CardDriver({
    name,
    driver_id,
    description,
    car_model,
    rating,
    avaliation,
    dataDistance,
    price_per_rate,
    rate,
  
  }: CardDriverProps) {

    const navigate = useNavigate(); 

    const [dataTravel, setDataTravel] = useState({
      driver_id: 0, 
      user_id: 0,
      date_time : "",
      driver_name: "" ,
      origin: ""  ,
      destination: "",
      distance: "",
      time: '', 
      race_value: 0, 
    }); 


    function handleChangeForm() {
      setDataTravel ({
        driver_id: driver_id ,
        user_id: Number(localStorage.getItem('user_id')),
        date_time: date_time.toString(),
        driver_name: name,
        origin: JSON.stringify(state.start_location),
        destination: JSON.stringify(state.end_location),
        distance: state.dataDistance,
        time: state.time,
        race_value: price_per_rate,
      });
    }

   const { state } = useDriverContext();

    const date_time = new Date().toISOString();

  
    async function ShearchHistory() {

      localStorage.setItem("driver_id", driver_id.toString());
      
      const user_id = Number(localStorage.getItem('user_id'));
      try {
        
        if(!driver_id || !user_id || !date_time || !name || !origin || !dataDistance || !state.time || !rate ) {
              return;
          }
          const { data } = await api.patch(`/ride/confirm`,{ ...dataTravel })
          if(data) {
            setTimeout(()=>{
              navigate(`/ride/${user_id}`)
            },500)
          }
        } catch (error) {
          console.error('Error:', error);
          window.location.href = '/ride/estimate'

        }  
      } 

   useEffect(()=> {
    handleChangeForm();
   },[])

    return (
        <>
        <main className='card-container'>
            <div className='info-card'>
                <span>ID:  {driver_id}</span>
                <h2>{name}</h2>
                <p>{description}</p>
                <p>Carro: {car_model}</p>
                <p>Avaliação: {rating}</p>
                <p>Avaliações:<span> { avaliation }</span></p>
                <p>Kilometragem: {dataDistance} km</p>
                <p>Valor da corrida: R$ {price_per_rate.toFixed(2)}</p>
                <p>Taxa por km: R$ {rate}</p>                
                <button onClick={()=>ShearchHistory()}>Escolher e confirmar</button>
            </div>
        </main>

        </>
    )


  }
export default CardDriver;
