import React from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="container">
      {/* 메뉴 */}
      <nav className='mt-5'>
        <Link to="/" className="fs-2 me-2"> Home </Link>
      </nav>
      {/* 본문 */}
      <div className='mt-5'>
        <Routes>
          <Route path="/" element={<Home/>} />
          
        </Routes>

      </div>

    </div>
  );
}

export default App;
