import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CountProvider } from './context/CountProvider';
import { ProductProvider } from './context/Productprovider.tsx'
import { UserProvider } from './context/UserProvider.tsx'
import { BookProvider } from './context/BookProvider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ProductProvider>
  
    <BookProvider>
    <UserProvider>
      <CountProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CountProvider>
    </UserProvider>
    </BookProvider>
  </ProductProvider>
)
