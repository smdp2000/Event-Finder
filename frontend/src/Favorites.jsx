import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, Fragment} from 'react';
import Card from 'react-bootstrap/Card';

import { Table } from 'react-bootstrap';
import {RiDeleteBinLine} from "react-icons/ri";


function Favorites (){

    const [favTable, setfavTable] = useState([])
    const [update,setUpdate] = useState('false')


    useEffect(() => {
       // setfavTable([])
        console.log(favTable)
        const TableData = []
       console.log("length of favtable", localStorage.length)
    for(let i=0; i<localStorage.length;i++){
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        console.log(JSON.parse(value))
        TableData.push(JSON.parse(value))
    }
    setfavTable(TableData)
    
      }, []);


    function handledelete(key){
      alert('Removed from favorites!'); 
      localStorage.removeItem(key);

      const TableData = []
       console.log("length of favtable", localStorage.length)
    for(let i=0; i<localStorage.length;i++){
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        console.log(JSON.parse(value))
        TableData.push(JSON.parse(value))
    }
    setfavTable(TableData)

    }


    return (
        
        (localStorage.length)>0 
            ?
            

            

           <div  className="col-sm-10  m-auto" style={{borderRadius:"0.8rem", overflowX:'auto'}} >
            <Table  hover className="bg-white" style={{borderRadius:"0.8rem", textAlign:'center', minWidth:'500px'}}>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Event</th>
                <th>Category</th>
                <th>Venue</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
                {favTable.map((row,key)=>(

                    <tr key={key}>
                   
                    <td>{key+1}</td>
                    <td>{row.date}</td>
                    <td>{row.name}</td>
                    <td>{row.genre}</td>
                    <td>{row.venue}</td>
                <td onClick={()=>handledelete(row.key)}>  <RiDeleteBinLine/>  </td>

                    </tr>
                    
                ))}
              
            </tbody>
          </Table>
            
          </div>
                
            :
            <p className="col-8 mx-auto" style={{color:"red", textAlign:"center", borderRadius:"20px", backgroundColor:"white", fontSize:"18px"}}>No favorite events to show</p>
           
          //   <Card className='col-sm-8 text-center mx-auto' >
          //   <Card.Body>
          //     <Card.Text className='text-red'>
          //     <p class="text-danger">No Favorites Events to Show</p>
                
          //     </Card.Text>
          //   </Card.Body>
          // </Card>

    );
}

export default Favorites;