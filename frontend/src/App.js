import './App.css';
import ChatComp from './chatComp';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

import AdminComp from './adminComp';
import Login from './components/Login/login';
import Recover from './components/Recover/recover';


function App() {
  return (

      //  <ChatComp/>
    // <BrowserRouter>

    <Router>
    <Routes>
            <Route exact path='/' element={< ChatComp />}></Route>
            <Route path="/login" element={<Login />} />
            <Route exact path='/admin' element={< AdminComp />}></Route>
            <Route exact path='/reset-password/change-password/*' element={< Recover />}></Route>

      </Routes>
    {/* // </BrowserRouter> */}

    </Router>
    //  <AdminComp/>
  );
}

export default App;
