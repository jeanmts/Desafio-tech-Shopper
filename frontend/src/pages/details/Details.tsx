import { useDriverContext } from '../../context/DriverHook';
import CardDriver from '../../components/cardDriver/CardDriver';
import './styles.css'
import MapComponent from '../../components/maps/MapsComponent';
import { Key } from 'react';
import React from 'react';

function Details() {

    const { state } = useDriverContext();

    const dataDistance = Number(state.dataDistance).toFixed(2)

    const stateFilter = state.filterDrivers;
    return (
        <>
            <div className='container-details'>

            <header className="header-details">
                <h1>Detalhes da viagem</h1>  
          </header>
          <MapComponent/>

        <main className='main-details'>
            <div className='container-card'>
          {stateFilter.map((states: { user_id: Key | null | undefined; name: string; driver_id: number; description: string; car_model: string; rating: number; avaliation: string[]; price_per_rate: number; rate: number; })=>{
              return(
                  <>
                  <div key={states.user_id}>

                     <CardDriver  name={states.name} 
                        driver_id={states.driver_id}
                        description={states.description}
                        car_model={states.car_model}
                        rating={states.rating}
                        avaliation={states.avaliation}
                        dataDistance={dataDistance}
                        price_per_rate={Number(states.price_per_rate.toFixed(2))}
                        rate={states.rate}/>
                        </div>
                    </>
                )
            })}
      
            </div>
            </main>

            </div>

        </>
    )
}

export default Details;