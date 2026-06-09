import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/*somewebsite.com/ */}
        <Routes path="/" element={<div>Hello, world!</div>} />

        {/*somewebsite.com/users */}
        <Route path="/users" element={Outlet}>
          {/*somewebsite.com/users */}
          <Route index element={<div>Users Index page</div>} />

          {/*somewebsite.com/users/1234 */}
          <Route path="/userId" element={<div>User profile Page</div>}/>
        
        </Route>
        <Routes path="/" element={<div>Hello, world!</div>} />
        <Routes path="/" element={<div>Hello, world!</div>} />
        <Routes path="/" element={<div>Hello, world!</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
