import './styles.css'
import api from '../../services/api';
import {  useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom'; 
import React from 'react';

function HistoryTravel() {

    const navigate= useNavigate();

    const [responseHistory, setResponseHistory] = useState([{driver_id: 0,date_time: 0, driver_name: '',origin: '', destination:'',distance: 0, time: 0, race_value: 0}]);

    const [selectedDriver, setSelectedDriver] = useState('');

    const [isVisible, setIsVisible] = useState(false);


    const drivers = [
      { id: 0, name: 'Todas as Corridas' },
      { id: 1, name: 'Hommer Simpson' },
      { id: 2, name: 'Dominic Toretto' },
      { id: 3, name: 'James Bond' },
    ];

    const handleChange = (event:  React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedDriver(event.target.value);
    };

    const user_id = Number(localStorage.getItem('user_id'));
      async function searchHistory (driver_id: number) {
        try {
          
          if(!driver_id) {
            const {data} = await api.get(`/ride/${user_id}/`);            
            setResponseHistory(data)
            setIsVisible(false)
          } else {
            const {data} = await api.get(`/ride/${user_id}/${driver_id}`);
            setResponseHistory(data)
            setIsVisible(false)
          }
        } catch (error) {
          setIsVisible(true)
          console.error(error)
        }
      }
      
      
function logout() {
    localStorage.clear();
    const user_id = localStorage.getItem('user_id');
    if(!user_id) {
      setTimeout(()=>{
        navigate('/ride/estimate')
      },1000)
    }
  }

  useEffect(() => {
    searchHistory(Number(selectedDriver))
  }, [])


    return (
        <>
    <div className='container-travel'>
<header>
    <h1>Histórico de Viagens</h1>
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
        <label htmlFor="driver-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Escolha um motorista:
        </label>
        <select
          id="driver-select"
          value={selectedDriver}
          onChange={handleChange}
          style={{
            padding: '5px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <option value="" disabled>
            Selecione um motorista
          </option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
    <button className='button-header' onClick={()=>searchHistory(Number(selectedDriver))}>Aplicar filtro</button>
    <button className='button-header' onClick={()=> logout()}>Sair</button>
      </div>
</header>
<main className='main-travel'>

{ isVisible ? <span className='span-valid'>Você não possui Viagens com esse motorista!</span> : responseHistory.map((history)=> {
    return (
        <>
    <div className='container-history'>
      <div key={history.driver_id} className="history">
  <p>
    <strong>Data e Hora:</strong> <span>{history.date_time}</span><br />
    <strong>Motorista:</strong> <span>{history.driver_name}</span><br />
    <strong>Origem:</strong> <span>{history.origin}</span><br />
    <strong>Destino:</strong> <span>{history.destination}</span><br />
    <strong>Distância:</strong> <span>{history.distance} km</span><br />
    <strong>Tempo:</strong> <span>{history.time}</span><br />
    <strong>Valor:</strong> <span>R$ {history.race_value}</span>
  </p>
</div>
    </div>
        </>
    )
})}
</main>

    </div>
        </>
    )
}

export default HistoryTravel;