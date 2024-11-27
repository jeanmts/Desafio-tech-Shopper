import './App.css'
import { Routes, Route} from 'react-router-dom';
import Details from './pages/details/Details';
import Shearch from './pages/main/Shearch';
import HistoryTravel from './pages/historyTravel/HistoryTravels';
import React from 'react';

function App() {
  return (
        <Routes>
          <Route path="/ride/estimate" element={<Shearch />} />

          {/* Rota principal */}
          <Route path="/" element={<Shearch />} />

          <Route path="/ride/confirm" element={<Details />} />
          <Route path="/ride/:user_id/" element={<HistoryTravel />} />
          <Route path="/ride/:user_id/:driver_id?" element={<HistoryTravel />} />

          
        </Routes>

  );
}

export default App;


