import dotenv from 'dotenv';

import {Request, Response} from "express"
const pool = require("../services/connection");

import { Client } from '@googlemaps/google-maps-services-js';  // Importando a biblioteca
const client = new Client({});



const searchDriver = async (req: Request, res: Response) => {

    const { origin, destination} = req.body;
   
    try {

        if (!origin ||!destination) {
            return res.status(400).json({ message: "Você precisa fornecer os endereços de origem e destino." });
        }

        const responseMaps = await client.directions({
            params: {
                origin: origin as string,
                destination: destination as string,
                key: process.env.GOOGLE_API_KEY as string,
            },
        });


        

        if (responseMaps.data.routes.length < 0) {
            return res.status(404).json({ message: "Não foi possível encontrar um caminho entre os dois endereços." });
        }
        const drivers = "select * from drivers"

        const {rows} = await pool.query(drivers)
        const distanceConvert = responseMaps.data.routes[0].legs[0].distance.value / 1000 ;  // converção de milhas para KM  

        const filterDrivers = rows.filter((driver : any)=>{
            return distanceConvert >= driver.kilometer;
        })
        
        if(!filterDrivers[0]) {
            return res.status(406).json({"error_code" : "INVALID_DISTANCE"});
        } else {

            for(let i = 0; i< filterDrivers.length; i++) {
                filterDrivers[i].price_per_rate = distanceConvert * filterDrivers[i].rate;
            }

            const dataDistance = responseMaps.data.routes[0].legs[0].distance.value / 1000;
            const dataDuration = responseMaps.data.routes[0].legs[0].duration.text;
            const dataOrigin= responseMaps.data.routes[0].legs[0]

            res.status(200).json({filterDrivers, dataDistance, dataDuration, dataOrigin})
        }
    } catch (error) {
        console.log(error)
    }

};



const confirmTravel = async (req: Request, res: Response) => {
    const { driver_id, user_id, date_time, driver_name, origin, destination, distance, time, race_value } = req.body;

    try {

        if (!driver_id || !user_id || !date_time || !driver_name || !origin || !destination || !distance || !time || !race_value) {
            return res.status(400).json({ "error_code": "INVALID_DATA"});
        }

        if (!origin || !destination && origin !== destination)  {
            return res.status(400).json({ "error_code": "Você precisa fornecer os parâmetros 'origem' e 'destino, e eles não podem ser iguais !'" });
        }


        const selectUser = "select * from users join drivers on user_id = $1 and driver_id = $2";
            const params = [user_id, driver_id]
            const {rows} = await pool.query(selectUser, params)
      
            const  filterUSer = rows; 

            const filter = filterUSer.filter((user : any)=>{
                return user.user_id === user_id;
            })

            if(filter.length == 0) {
                const paramsUSer = [user_id, origin, destination];
                const queryUser = 'insert into users (user_id, origin, destination) values ($1, $2, $3)';
                const recordUser = await pool.query(queryUser, paramsUSer);    
            }

        if (filter) {
            const query = 'insert into travel_history (driver_id, user_id, date_time, driver_name, origin, destination, distance, time, race_value) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            const parms = [driver_id,user_id, date_time, driver_name, origin, destination, distance, time, race_value];
            const {rows} =  await pool.query(query, parms);

            return res.status(200).json({"sucess": "true"},);
        } else {
            return res.status(404).json({ "error_code": "INVALID_DATA"});
        }
        
    } catch(err) {  
        console.error(err);
        return res.status(500).json({ "error_description": "Error ao realizar viagem!" });
    }
};


const travelHistory = async (req : Request, res: Response) => {
    const { user_id, driver_id } = req.params;

        try {

            if(driver_id == undefined) {
                const query = 'select * from travel_history where user_id = $1 order by date_time desc';
                const params = [user_id];
                const { rows } = await pool.query(query, params);
                const travels = rows;

                if (travels.length == 0) {
                    return res.status(404).json({ "error_code": "NO_RIDES_FOUND"});
                } else  {
                    return res.status(200).json(travels);
                } 
            } else {
                const query = 'SELECT * FROM travel_history WHERE user_id = $1 and driver_id = $2 order by date_time desc';
                
                const params = [user_id, driver_id];
                
                const { rows } = await pool.query(query, params);
                const travels = rows;
                
                if(Number(driver_id) < 1 && Number(user_id) > 3) {
                    return res.status(404).json({"error_code": "INVALID_DRIVER",});
                }
                if (travels.length == 0) {
                    return res.status(404).json({ "error_code": "NO_RIDES_FOUND"});
                } else  {
                    return res.status(200).json(travels);
                }   
            }
        } catch (error) {
            console.error(error);
        }
};




  module.exports = { travelHistory, confirmTravel, searchDriver};