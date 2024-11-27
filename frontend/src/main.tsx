import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App"
import { BrowserRouter } from 'react-router'
import  DataContextProvider  from './context/DriverProvider';
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <DataContextProvider>
              <App />
        </DataContextProvider>
      </BrowserRouter>
  </StrictMode>,
)
