import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createContext } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Products } from './components/Products'
import { Cart } from './components/Cart'
import { Product } from './components/Product'

const queryClient = new QueryClient()
export const Context = createContext(null)

function App() {
  const [status, setStatus] = useState({ cart: [] })

  return <Context.Provider value={{ status, setStatus }}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route index element={<Products />} />
            <Route path="*" element={<Products />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Context.Provider>

}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
