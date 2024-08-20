import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/(root)/home/Home";
import About from "./pages/(root)/about/About";
import ErrorPage from "./pages/(root)/ErrorPage";
import Contact from "./pages/(root)/contact/Contact";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className=''>
      <Navbar />
      <div className='bg-gray-300 px-4 py-8 '>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
