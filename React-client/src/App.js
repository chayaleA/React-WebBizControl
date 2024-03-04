import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './components/main/home';
import Login from './components/admin/login';
import ServicesDetails from './components/main/servicesDetails';
import MeetingsDetails from './components/admin/meetingsDetailes';
import './App.css';

export const kindOfUser = createContext();

function App() {
  const initialIsAdmin = JSON.parse(localStorage.getItem('isAdmin')) || false;
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

  React.useEffect(() => {
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }, [isAdmin]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" index element={<Home isAdmin={isAdmin} setIsAdmin={setIsAdmin}></Home>}></Route>
          <Route path="/login" element={<Login isAdmin={isAdmin} setIsAdmin={setIsAdmin} ></Login>}
          ></Route>
          <Route path="/services" element={<ServicesDetails isAdmin={isAdmin} setIsAdmin={setIsAdmin}></ServicesDetails>}></Route>
          <Route path="/meetings" element={<MeetingsDetails isAdmin={isAdmin} setIsAdmin={setIsAdmin}></MeetingsDetails>}></Route>
        </Routes>
        <kindOfUser.Provider value={{ isAdmin, setIsAdmin }}>
          <Outlet />
        </kindOfUser.Provider>
      </Router>
    </div>
  );
}

export default App;
