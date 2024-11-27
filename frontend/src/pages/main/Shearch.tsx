import './styles.css'
import backgroudSearch  from '../../assets/background-search.png';
import shopperLogo from '../../assets/shopper-logo.png';
import {  useNavigate } from "react-router-dom";
import api from '../../services/api';
import { useState } from 'react';
import { useDriverContext } from '../../context/DriverHook';
import React from 'react';


function Shearch() {

  const [ form, setForm] = useState({origin: '', destination: '', user_id: ''})
  const navigate = useNavigate(); 
  const { state } = useDriverContext();

  const [isEmpty, setIsEmpty] = useState(false);

function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
  setForm({...form, [e.target.name]: e.target.value})
}


function hanleIsvalidID() {
  if(localStorage.getItem('user_id')) {
    localStorage.clear()
  }
    return;  
}
async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
   e.preventDefault();

  try {
    
    if(!form.origin || !form.destination || !form.user_id) {
        setIsEmpty(true);
      return;
    }

    const {data}= await api.post('/ride/estimate', {
      ...form
    })
    if(data){
      localStorage.setItem('user_id', form.user_id);
      state.filterDrivers = data.filterDrivers
      state.dataDistance = data.dataDistance
      state.dataDurantion = data.dataDurantion
      state.start_location = data.dataOrigin.start_address
      state.end_location = data.dataOrigin.end_address
      state.time = data.dataOrigin.duration.text
    }

    navigate('/ride/confirm')
    } catch (error) {
      console.error(error);
    }
   setForm({origin: '', destination:'', user_id: ''})
}
    return (
      <>
      <main className='container-main'>
          <img className='img-background' src={backgroudSearch} alt="imagem de fundo animação um carro na estrada" />
      <div className='container-form'>
        <img className='img-logo' src={shopperLogo} alt="imagem do logo da shopper" />
        <form onSubmit={handleSubmit} action="submit" className='form'>
          <label className='label-form'  htmlFor="origin">Origem</label>
          <input className='input-form' name='origin' type="text"value={form.origin} onChange={handleChangeInput} />
          <label className='label-form'  htmlFor="destination">Destino</label>
          <input className='input-form' type="text" name='destination' value={form.destination} onChange={handleChangeInput} />
          <label className='label-form' htmlFor="user_id">ID do usuario</label>
          <input className='input-form' type="number" name='user_id' value={form.user_id} onChange={handleChangeInput} />
        {isEmpty ? <span>Todos os campos são obrigatórios</span> : null}
          <button onClick={()=>hanleIsvalidID} className='button-form' >Estimativa de valor</button>
        </form>
        </div>
        </main>  
      </>
    )
  }
  
  export default Shearch;