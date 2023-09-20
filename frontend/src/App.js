import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import SearchEvents from './SearchEvents'
import Navbar from './NavBar'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Favorites from './Favorites';



function App() {

 

  // <Navbar/>

  // <Route exact path="#search" component={<SearchEvents/>} />
  // <Route path="#favotite" component={<h1>About Page</h1>} />



  return (

    <React.Fragment>

      <BrowserRouter>
      <Navbar/>
      <div className='mt-5'>
      <Routes>


      <Route path="/" element={<SearchEvents/>} />

      <Route path="/search" element={<SearchEvents/>} />
      <Route path="/favorites" element={<Favorites/>} />


      </Routes>
      </div>


      </BrowserRouter>

      </React.Fragment>

    

   
);
    
    

}

export default App;
