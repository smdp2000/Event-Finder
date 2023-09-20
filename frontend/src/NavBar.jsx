import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState} from 'react';
import { NavLink } from 'react-bootstrap';
import { BrowserRouter, Route, Link, Switch, useLocation, useResolvedPath } from "react-router-dom";


function NavScrollExample() {
  const location = useLocation().pathname;
  console.log(location)
    const [btnSearch, setSearch] = useState(location=='/search' || location=='/'  ?'outline-light':'link');
    const [btnFav, setFavorite] = useState(location=='/favorites'?'outline-light':'link');

    


  const handleClick = (btn) => {
    if(btn === 'btn1'){
        // setSearch(btnSearch == 'outline-light' ? 'link' : 'outline-light');
        setSearch('outline-light')
        setFavorite('link')
        //setFavorite(btnFav == 'outline-light' ? 'link' : 'outline-light');

    }
   else{
    setSearch('link')
    setFavorite('outline-light')
        //setFavorite(btnFav == 'outline-light' ? 'link' : 'outline-light');
        //setSearch(btnSearch == 'outline-light' ? 'link' : 'outline-light');

   }
  };
  
    return (
      <Navbar  expand="lg sm" style={{display: 'flex',justifyContent: 'flex-end'}}>
       <Nav style = {{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Link to="/search" ><Button  variant={btnSearch} onClick={() => handleClick('btn1')} style={{backgroundColor: 'transparent', color: 'white', textDecoration: 'none', marginRight: '10px'}} >Search</Button></Link>
            <Link to="/favorites" ><Button  variant={btnFav}  onClick={() => handleClick('btn2')} style={{backgroundColor: 'transparent', color: 'white', textDecoration: 'none'}} >Favorites</Button></Link>
           
        </Nav>
      </Navbar>
    );
  }

  export default NavScrollExample;

  //CURRENTPATH, RESOLVEDPATH