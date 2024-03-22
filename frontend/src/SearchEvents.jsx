import { useEffect, useState, Fragment} from 'react';
import { Card, Form, Button,Row, Col, ListGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppCustom.css'
//import Autocomplete from '@material-ui/lab/Autocomplete';
import { Typeahead } from 'react-bootstrap-typeahead';
//import Geohash from 'https://cdn.jsdelivr.net/npm/latlon-geohash@2.0.0';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IoHeartCircleOutline } from "react-icons/io5";
import Container from 'react-bootstrap/Container';
import {  TwitterIcon,TwitterShareButton,FacebookShareButton, FacebookIcon } from 'react-share';
import Carousel from 'react-bootstrap/Carousel';
import Image from "react-bootstrap/Image";
import ShowMoreText from "react-show-more-text";
import Modal from 'react-bootstrap/Modal';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { SocialIcon } from 'react-social-icons';
import CircularProgress from '@mui/material/CircularProgress';
import { FaHeart, FaRegHeart, FaSpotify } from "react-icons/fa";
import { OpenWithSharp } from '@mui/icons-material';
import { Spinner } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { borderRadius } from '@mui/system';


const NoResultsFoundAlert = ({text}) => {
  return (
      <Alert variant="light" style={{ borderRadius: '10px', backgroundColor: 'white'}}>
        <h6 className="text-center " style={{ color: 'red' }}>{text}</h6>
        </Alert>

  );
};

const ArtistsDisplay = ({item}) => {

return(

  <div className='col-sm-8 col-12 mx-auto'>
  <Row>

  <Col className='col-sm-4 col-12'>
  <Image
   style={{height:'150px'}}
   src= {item.img1}
 roundedCircle
 />
 <div style={{textAlign:'center', marginTop:'5px'}}>
   <p>{item.name}</p>
   </div>
  </Col>

  <Col className='col-sm col-12'>
   <p>Popularity</p>
   <Box sx={{ position: 'relative', display: 'inline-flex' }}>

   <CircularProgress variant="determinate" value={item.popularity} style={{'color': 'red'}}  /  >
   <Box
   sx={{
     top: 0,
     left: 0,
     bottom: 0,
     right: 0,
     position: 'absolute',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     color:'white'

   }}
 >
   <Typography variant="caption" component="div" color="white">
     {item.popularity}
   </Typography>
 </Box>
</Box>

  </Col>
  
  <Col className='col-sm col-12 ' >
   <p>Followers 
  <p style={{marginTop:'18px'}}>{item.followers.toLocaleString()}</p>
  </p>

  
  </Col>
  <Col className='col-sm col-12'>
 
   <p>Spotify Link<br></br><br></br>
   <a href={item.url} target="_blank" rel="noopener noreferrer">

   <FaSpotify size={32} style={{ color: 'green' }} />
   </a>

  </p>
  
  </Col>
   
  </Row>
  <Row style={{marginTop:'30px'}}>
 
  <div className='album-title'>
   <p>Albums featuring {item.name}</p>
 
   </div>
 
  <Col className='col-sm-4 col-12 mb-3'>
 
  <Image
          style={{height:'150px'}}
   src={item.alb1}
 rounded
 />
  </Col>
  <Col className='col-sm col-12 mb-3'>
  <Image
 
 style={{height:'150px'}}
 
   src= {item.alb2}
 rounded
 />
  </Col>
  <Col className='col-sm col-12 mb-3'>
  <Image
 style={{height:'150px'}}
 src={item.alb2}
 rounded
 />
  
  </Col>
  </Row>
  </div>



)

}

function StatusText({ code }) {
  let clr=''
  if(code.toLowerCase() =='onsale'){
    code = 'On sale'
    clr='green'
  }
  else if(code.toLowerCase() =='offsale'){
    code = 'Off sale'
    clr='red'


  }
else if(code.toLowerCase() == 'cancelled'){
  code = 'Cancelled'
  clr='black'

}
else if(code.toLowerCase()=='postponed'){
  code = 'Postponed'
  clr='orange'

}
else if(code.toLowerCase()=='rescheduled'){
code = 'Rescheduled'
clr='orange'
}
else{
  code=''
  clr=''
}

  const style = {
    backgroundColor: clr,
    padding: "2px",
    color: "white",
    borderRadius:'5px'
  };

  return <div className='col-sm-3 col-5 mx-auto 'style={style}>{code}</div>;


}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function executeOnClick(isExpanded) {
  console.log(isExpanded);
}


function BasicExample() {
  console.log("running")

  /*STATE VARIABLES */
const [suggestions, setSuggestions] = useState([])
const [singleSelections, setSingleSelections] = useState([]);
const [keyword, setInputValue] = useState('');
const [autoDetectLocation, setAutoDetectLocation] = useState(false);
const [tableData,setTableData] = useState([]);
const [showCard, setShow] = useState(false);
const [favicon, setfav] = useState(false);
const [events, setEvents] = useState({})
const [artistData, setArtist] = useState([]);
const [token, setToken] = useState('')
const [favitems, setFavitems] = useState([]);
const [favevt, setFavevt] = useState(false);
const [venueData, setVenuedata] = useState({});
const[isLoading, setLoading] = useState(false)
const[noTb, setNotb] = useState(false);
const [formData, setFormData] = useState({
  distance: 10,
  category: 'Default',
  location: '',
  checked: false
})

var SpotifyWebApi = require('spotify-web-api-node');


var clientId = 'cf4f829c14984e4897f82ece22f312b9',
  clientSecret = 'dab3818160cd4995a57ad2f0d6c53454';

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

const [showMap, setMap] = useState(false);

const handleClose = () => setMap(false);
const handleMap = () => setMap(true);







const styles = {
  imag: {
    height: 70,
    width: 60,
  },
  '@media only screen and (min-device-width: 414px) and (max-device-width: 428px)': {
    imag: {
      height: 20,
      width: 10,
    }
   
   
  }
}

function handle_undefined(obj){
  if(obj==undefined || obj.toLowerCase == 'undefined'){
      return ''
  }
  else{
    return obj
  }

}

  useEffect(()=>{
    const loadSuggestions = async () => {
      setLoading(true)
      console.log("CHALA")
      console.log(keyword)
    const result = await axios.get(`/suggest?keyword=${keyword}`);
    let names =[]
    if(result.data._embedded!=undefined)
        names = handle_undefined(result.data._embedded.attractions) || ''
    console.log(names)
    var options = []
    for(let i=0; i<names.length; i++){
        options.push(names[i].name)
        console.log("CHECK")
        console.log(options)
    }
    
    setSuggestions(options)
    setLoading(false)

    
    }

    if (keyword.length > 0) {
      loadSuggestions();
    }
    else{
          setSuggestions([]);

    }
  }, [keyword])
 
  // useEffect(() => {
  //   for(let i=0; i<localStorage.length; i++){
  //     const item = localStorage.key(i)
  //     if (favitems.includes(item)) {
  //       setFavitems(favitems.filter((i) => i !== item));
  //     } else {
  //       setFavitems([...favitems, item]);
  //     }
  //   }

  // }, []);

  const addToFavorites = (item, item_details) => {
    if (item==='remove') {
      localStorage.removeItem(item_details.key)
      alert("Event Removed from Favorites!")
      setFavevt(false)
    } else {
      console.log('Hello adding data to favtable')
      localStorage.setItem(item_details.key, JSON.stringify(item_details))
      alert("Event Added to Favorites!")
      setFavevt(true)
    }
  }
  
  console.log("NEWKWY")
  console.log('suggestion',suggestions)
  console.log('keyword',keyword)
  console.log('distance', formData.distance)
  console.log('location', formData.location)
  console.log('checked',formData.checked)


async function showVenue(venue){
  //
  const result = await axios.get("/venueinfo?"+"key="+venue);

  console.log("VENUE DATA")

  console.log(result.data)

  let name = venue;
  let address = '', city = '', state = '', ph ='',ophrs='',gr='',cr='',lat='',lon='';

  if(result.data==undefined || result.data._embedded == undefined || result.data._embedded.venues.length<=0 ){
    return
  }
  let vinfo = result.data

  name = venue;
  if(vinfo._embedded.venues[0].address!=undefined){

    address = handle_undefined(vinfo._embedded.venues[0].address.line1)
    
  }

  if(vinfo._embedded.venues[0].city!=undefined){

    city = handle_undefined(vinfo._embedded.venues[0].city.name)

  }

  if(vinfo._embedded.venues[0].state!=undefined){

    state = handle_undefined(vinfo._embedded.venues[0].state.name)

  }

  if(vinfo._embedded.venues[0].boxOfficeInfo!=undefined){

  ph = handle_undefined(vinfo._embedded.venues[0].boxOfficeInfo.phoneNumberDetail)
  ophrs = handle_undefined(vinfo._embedded.venues[0].boxOfficeInfo.openHoursDetail)

  }


  if(vinfo._embedded.venues[0].generalInfo!=undefined){

    gr = handle_undefined(vinfo._embedded.venues[0].generalInfo.generalRule)
    cr = handle_undefined(vinfo._embedded.venues[0].generalInfo.childRule)

  }
 
  if(vinfo._embedded.venues[0].location!=undefined){

  lat = handle_undefined(vinfo._embedded.venues[0].location.latitude)
  lon = handle_undefined(vinfo._embedded.venues[0].location.longitude)

  }

  if(city!=''){
    address  += ', ' +city

    if(state!=''){
      address+=', '+state
    }


  }


  const venue_data = {
    'name':name,
    'address' : address,
    'ph': ph,
    'ophrs':ophrs,
    'gr':gr,
    'cr': cr,
    'lat':parseFloat(lat),
    'lon':parseFloat(lon)
  }

  console.log(venue_data)
  setVenuedata(venue_data)

}

async function geteventInfo(key){
  console.log("EVENT DATA")

  if(localStorage.getItem(key)!=null){
    setFavevt(true)
  }
  else{
    setFavevt(false)
  }

  const result = await axios.get("/eventinfo?"+"key="+key);
  console.log("EVENT DATA")
  console.log(result.data)
// put condition
  setShow(true)
  let events;
  if(result.data != undefined){
      events = result.data
  }

  const name  =  handle_undefined(events.name)
  const url = handle_undefined(events.url)
  let img=''
  if(handle_undefined(events.seatmap)!=''){
    img = handle_undefined(events.seatmap.staticUrl)
  }

  let localDate='',localTime='',code='', venue='',genre='',maxprice='',minprice='',price='';

  if(events.dates!=undefined){
    if(events.dates.start!=undefined){
      if(events.dates.start.localDate!=undefined)
          localDate = events.dates.start.localDate
          
      if(events.dates.start.localTime!=undefined)
          localTime = events.dates.start.localTime

    }

    if(events.dates.status.code!=undefined){
      code = (events.dates.status.code.toLowerCase() ==="undefined" || events.dates.status.code == undefined)?'':events.dates.status.code///

    }

  }

  let artists = []
  let music = []

  if(events._embedded!=undefined && events._embedded.attractions!=undefined && events._embedded.attractions.length>0){
          
    if(events._embedded.venues!=undefined && events._embedded.venues.length>0  ){
      venue = (events._embedded.venues[0].name.toLowerCase() === "undefined" || events._embedded.venues[0].name == undefined) ? '' : events._embedded.venues[0].name
  }
    if(events._embedded.attractions!=undefined && events._embedded.attractions.length>0){
    for(let i=0; i<events._embedded.attractions.length; i++){
              console.log(i)
            if(events._embedded.attractions[i].name!= undefined && events._embedded.attractions[i].name.toLowerCase()!='undefined'){
              console.log("INSIDE       CHECKING            MUSIC1")
                console.log(events._embedded.attractions[i].name)
                artists.push(events._embedded.attractions[i].name)

                if(events._embedded.attractions[i].classifications!= undefined && events._embedded.attractions[i].classifications.length>0){
                  console.log("INSIDE       CHECKING            MUSIC2")

                  if(events._embedded.attractions[i].classifications[0].segment!= undefined){
                    console.log("INSIDE       CHECKING            MUSIC3")

                    if(events._embedded.attractions[i].classifications[0].segment.name!= undefined){
                      console.log("INSIDE       CHECKING            MUSIC4")

                         if(events._embedded.attractions[i].classifications[0].segment.name.toLowerCase()=='music'){
                          console.log("INSIDE       CHECKING            MUSIC5")
                              music.push(events._embedded.attractions[i].name)
                         }
                    }

                  }
                }

            }
    }
  }
  }

  let artist = artists[0]
  for(let i=1; i<artists.length; i++){
    artist += ' | ' + artists[i]
  }



  //combine them artists

  if(events.classifications!==undefined && events.classifications.length>0 ){
                
    if(events.classifications[0].segment!=undefined){

      genre = (events.classifications[0].segment.name.toLowerCase() === 'undefined'|| events.classifications[0].segment.name==undefined) ? '' : events.classifications[0].segment.name
      console.log(genre)

    }
    if(events.classifications[0].genre!=undefined){

      genre += (events.classifications[0].genre.name.toLowerCase() === 'undefined' || events.classifications[0].genre.name==undefined) ? '' :( ' | ' + events.classifications[0].genre.name)

    }
    if(events.classifications[0].subGenre!=undefined){

      genre += (events.classifications[0].subGenre.name.toLowerCase() === 'undefined' || events.classifications[0].subGenre.name==undefined) ? '' :( ' | ' + events.classifications[0].subGenre.name)

    }
    if(events.classifications[0].type!=undefined)
    {
      genre +=  (events.classifications[0].type.name.toLowerCase() === 'undefined' || events.classifications[0].type.name ==undefined) ? '' : ( ' | ' +events.classifications[0].type.name)
    }
    if(events.classifications[0].subType!=undefined)
    {
      genre +=  (events.classifications[0].subType.name.toLowerCase()  === 'undefined' || events.classifications[0].subType.name ==undefined) ? '' : ( ' | ' +events.classifications[0].subType.name)
    }
}

if(events.priceRanges!==undefined){
  maxprice = (events.priceRanges[0].max==='undefined' || events.priceRanges[0].max == undefined) ? '':events.priceRanges[0].max
  minprice = (events.priceRanges[0].min==='undefined' || events.priceRanges[0].min==undefined) ? '':events.priceRanges[0].min

  }
  if(maxprice!='' && minprice!='')
        price = minprice+ ' - ' + maxprice + ' USD'
    
  if(maxprice=='' && minprice!=''){

    price = minprice+ ' - ' + minprice + ' USD'

  }
  if(maxprice!='' && minprice==''){

    price = maxprice+ ' - ' + maxprice + ' USD'

  }

  setEvents({})

  const event_data = {
    'key':key,
    'name':name,
    'date':localDate,
    'time':localTime,
    'artist': artist,
    'venue': venue,
    'genre': genre,
    'price': price,
    'status': code,
    'url' : url,
    'img':img
  }
console.log("YAHHAN")
console.log(event_data)
setEvents(event_data)
setArtist([])


console.log("MUSICCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC", music)
if(music.length>0){
let Artist_Data = []

for(let i=0; i<music.length; i++){

  const URL = new URLSearchParams({
    'artist': music[i]
    
  })
  
  const artist_data = await axios.get("/artist?"+URL.toString());
  console.log("SPOTIFYYYYYYYYYYYYYYYYYYYYY")
  console.log(artist_data.data)

  Artist_Data.push(artist_data.data)


}



setArtist(Artist_Data)
console.log(Artist_Data)
console.log("FINAL SPOTIFY PAGE")
console.log(artistData)
}
console.log('artiststher',artistData.length)
showVenue(venue)


}



async function getTable(keyword, distance,  category, lat, lon){

  

  console.log(keyword, distance, category, lat, lon)
  const URL = new URLSearchParams({
    'keyword': keyword,
    'distance':distance,
    'category':category,
    'lat':lat,
    'lon':lon
  })
  const result = await axios.get("/events?"+URL.toString());
  console.log("TABLE DATA")
  console.log(result.data._embedded)
  if(result.data._embedded==undefined)
  {
    setShow(false)
    setEvents({})
   setArtist([])
   setVenuedata({})
   setValue(0)
    setNotb(true)
    return;
  }
  setNotb(false)
  setShow(false)

  const events = handle_undefined(result.data._embedded.events)
  const event_data= []
  for(let i=0; i<events.length; i++ ){
    let localDate = handle_undefined(events[i].dates.start.localDate)
    let localTime = handle_undefined(events[i].dates.start.localTime)
    let img = handle_undefined(events[i].images[0].url)
    let name = handle_undefined(events[i].name)
    let genre = handle_undefined(events[i].classifications[0].segment.name)
    let venue = handle_undefined(events[i]._embedded.venues[0].name)
    let id = handle_undefined(events[i].id)
    const data = {
      'localdate' : localDate,
      'localtime' : localTime,
      'img' : img,
      'name' : name,
      'genre' : genre,
      'venue' : venue,
      'id' : id,
    }
    event_data.push(data)
  }

  console.log(event_data)

  event_data.sort((a,b)=>{
    const dateCompare = new Date(a.localdate) - new Date(b.localdate);
  if (dateCompare !== 0) {
    return dateCompare;
  }
  return a.localtime.localeCompare(b.localtime);
  })
  setTableData(event_data)
  setEvents({})
   setArtist([])
   setVenuedata({})
   setValue(0)
  

}

  const handleSubmit = async(event) => {
    event.preventDefault();
    const form = event.currentTarget;
  //  if (form.checkValidity() === false) {
  //    event.stopPropagation();
  //  } else {
      // Create a new FormData object and pass in the form element
      //const formData = new FormData(form) ;
      // Get the values of each form field using the get method on the FormData object
      // const keyword = singleSelections[0];
      // const distance = formData.get('distance') || 10;
      // const category = formData.get('category');
      // const location = formData.get('location');
      // const autoDetect = autoDetectLocation
      const keyword = singleSelections[0];
      const distance = formData.distance || 10;
      const category = formData.category
      const location = formData.location
      const autoDetect = formData.checked
      console.log("FORM VALUES")
      let lat,lon;
      if(autoDetect==true){
        
        try {
          const response = await axios.get("https://ipinfo.io/json?token=be25c99972518a");
          console.log("current location")
          //console.log(response.data);
          const loc = response.data.loc.split(",");
          lat = loc[0]
          lon = loc[1]
          console.log(lat,lon)

        } catch (error) {
          console.error(error);
        }
      }

      else{
        const API_KEY = 'AIzaSyCCuArinOiLmVWSjZ1J1_xkjNuu3KiQAY4'

        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${API_KEY}`;

        try {
          const response = await axios.get(apiUrl);
          console.log("typed location")
          //console.log(response.data);
          const loc = response.data.results[0].geometry.location; // put undefined check
          lat = loc.lat
          lon = loc.lng
          console.log(lat,lon)
        } catch (error) {
          setShow(false)

          setNotb(true)
          console.error(error);
          return
        }

        

      }
      //const geohash = '9a256'//Geohash.encode(lat, lon, 7);
      console.log("TABLE API DATA")
      console.log(keyword, distance, category, location, autoDetect);

      getTable(keyword, distance,  category, lat, lon)


    //}
   // setValidated(true);
  };
  const handleAutoDetectChange = (event) => {
    // setAutoDetectLocation(event.target.checked);
    // const locationInput = document.getElementById('formGridlocation');
    // if (event.target.checked) {
    //   locationInput.removeAttribute('required');
    //   locationInput.value = '';
    // } else {
    //   locationInput.setAttribute('required', '');
    // }
    console.log("TOGGLE CHECKBOX")
    console.log(event.target.checked)
    const checked = event.target.checked;

    setFormData({
      ...formData,
      checked: checked,
      location: checked ? "" : formData.location
    });

    
  } ;

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleFav = ()=>{
    setfav(!favicon)
  }



  const containerStyle = {
    
    height:'400px'
  };
  
  const center = {
    lat: 34.052235  ,
    lng: -118.243683
  };

  const position = {
    lat: 34.052235 ,
    lng: -118.243683
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCCuArinOiLmVWSjZ1J1_xkjNuu3KiQAY4'
  });

  const filterBy = () => true;

  const handleInputChange = (e) =>{
    if(e.target.name=='distance'){
      console.log(e.target.value)
      setFormData({ ...formData, distance: e.target.value});
    }
    
    if(e.target.name=='category'){
      console.log(e.target.value)
      setFormData({...formData, category: e.target.value})
    }

    

    if(e.target.name=='location'){
      console.log(e.target.value)
      setFormData({...formData, location: e.target.value})
    }


  }
const handleClear = () => {
  setFormData({

    distance:10,
    category:'Default',
    location:'',
    checked:false
  })
  setSingleSelections([])
  setSuggestions([])
  setInputValue('')
  setTableData([])
  setEvents({})
  setArtist([])
  setVenuedata({})
  setValue(0)
  setShow(false)
}


  return (
    <Fragment>
    <Card className="custom-card col-sm-5 " style={{margin: 'auto', 

    background: 'rgba(85, 85, 85, 0.5)',
  backdropFilter: 'blur(2px)',
  border: 'none',
  overflow: 'hidden',
  color: '#ADD8E6' ,

    }  }>
      <Card.Body>
        <h2 style={{ textAlign: 'center', color: 'white' }}> Events Search</h2>
        <hr className='text-white'></hr>
    <div>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId='keyword'>
      <Form.Label>Keyword<span style={{color:'red'}}>*</span></Form.Label>
     
      <Typeahead
          id="basic-typeahead-single"
          //labelKey="name"
          filterBy={filterBy}
          onInputChange={(value) => { setInputValue(value)}}
          onChange={setSingleSelections}
          emptyLabel={isLoading ? <div class="spinner-border text-primary" role="status"><span class="sr-only"></span></div> : 'No results'}
          options={isLoading ? [] : suggestions}
          //options={suggestions}
          name='keyword'
          useCache = {false}  
          selected={singleSelections}
          
          inputProps={{ required: true }}
          

          
        />
        <Form.Control.Feedback type="invalid" title="Please select a keyword.">
        Please select a keyword.
     </Form.Control.Feedback>
      
     </Form.Group>
      <Row className="mb-3" style={{ marginTop: '0.8rem' }}>
        <Form.Group as={Col} className='col-12 col-sm-6' controlId="formGriddistance">
          <Form.Label>Distance</Form.Label>
          <Form.Control type = "number" name="distance"   onChange = {handleInputChange} value= {formData.distance}   />
        </Form.Group>
        <Form.Group as={Col} className='col-8 col-sm-6 mt-1'  controlId="formGridState">
          <Form.Label>Category<span style={{color:'red'}}>*</span></Form.Label>
          <Form.Select defaultValue="Choose..." value= {formData.category} name="category" onChange = {handleInputChange} >
            <option>Default</option>
            <option>Music</option>
            <option>Sports</option>
            <option>Arts & Theatre</option>
            <option>Film</option>
            <option>Miscellaneous</option>
          </Form.Select>


        </Form.Group>
      </Row>

      <Form.Group as={Col} controlId="formGridlocation">
          <Form.Label>Location<span style={{color:'red'}}>*</span></Form.Label>
          <Form.Control type="text" name="location"  onChange = {handleInputChange} value={formData.location} required={!formData.checked} disabled={formData.checked}/>
          
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{ marginTop: '0.8rem' }}>
        <Form.Check type="checkbox" checked={formData.checked} label="Auto-detect your location" name="autodetect" onChange={handleAutoDetectChange}/>
      </Form.Group>
      <div className="d-flex justify-content-center">
      <Button type="submit" variant="danger" className="mx-3">SUBMIT</Button>
      <Button variant="primary" className="ml-3" onClick={handleClear}>CLEAR </Button>
      </div>

        </Form>
        </div>

      </Card.Body>
     </Card>
     
     <br></br>

     <div  className='col-sm-10 mt-4 '   style= {{margin:'auto', borderRadius:"0.8rem", overflowX:'auto'}}>
     {(noTb)&& (<NoResultsFoundAlert text = 'No Results Found'/>)}
     {(!noTb)&&(!showCard) && (tableData.length > 0) && <Table    style= {{textAlign:'center', minWidth:'469px'}}  variant = 'dark' striped borderless>
        <thead>
          <tr>
            <th >Date/Time</th>
            <th  >Icon</th>
            <th >Event</th>
            <th >Genre</th>
            <th >Venue</th>
            
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, key) => (
            <tr style={{cursor:'pointer'}} key={key} onClick={() => geteventInfo(row.id)} >

              <td>
                 <div>{row.localdate}</div>
                  <div>{row.localtime}</div>
              </td>
              <td><img style={styles.imag}  src={row.img}/></td>
              <td>{row.name}</td>
              <td>{row.genre}</td>
              <td>{row.venue}</td>
            
            </tr>
          ))}
        </tbody>
      </Table>
}
</div>

<div>
  {(showCard) && (

<Card className="custom-card col-sm-7" style={{margin: 'auto', 

background: 'rgba(85, 85, 85, 0.5)',
webkitbackdropfilter: 'blur(2px)',
backdropFilter: 'blur(2px)',
border: 'none',
overflow: 'hidden',
color: 'white' ,
padding:'0px',
textAlign:'center'
}  }>
  <div style={{textAlign:'left'}}> <p onClick={()=>{setShow(!showCard); setValue(0)}} style={{cursor:'pointer'}}> &lt; <u>Back</u></p></div>
  <h4>{events.name} &nbsp;     
              {favevt ? (
              <FaHeart
                className="heart-icon-clicked"
                onClick={() => addToFavorites('remove', events)}
              />
            ) : (
              <FaRegHeart
                className="heart-icon"
                onClick={() => addToFavorites('add', events)}
              />
            )}
  
  </h4>
  <div style={{  marginTop:'25px'}}>
      <AppBar position="static"  style={{ background:'#29AB87', margintop:'10px'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
         
        >
          <Tab style={{textTransform: 'none'}} label="Events" {...a11yProps(0)} />
          <Tab style = {{textTransform: 'none'}} label="Artist/Teams" {...a11yProps(1)} />
          <Tab style = {{textTransform: 'none'}} label="Venue" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
       <SwipeableViews 
        
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > 
        <TabPanel  value={value} index={0} dir={theme.direction}>
        <Container>
      <Row>
        <Col >

          {events.date!='' && (<p>Date <br></br>{events.date} </p>)}
          {events.artist!='' && (<p>Artist/Team  <br></br>{events.artist} </p>)}
          {events.venue!='' && (<p>Venue  <br></br>{events.venue} </p>)}
          {events.genre!='' && (<p>Genre  <br></br>{events.genre} </p>)}
          {events.price!='' && (<p>Price  <br></br>{events.price} </p>)}
          {events.status!='' && (<p>Ticket Status<br></br><StatusText code={events.status}/> </p>)}
          {events.url!='' && (<p>Buy Ticket At:<br></br><a href={events.url} target="_blank"> Ticketmaster </a></p>)}

        </Col>

        <Col className='mt-4'>
       
        {events.img!='' && (

<img style= {{width:'300px', height:'400px', margin:'auto'}} src={events.img} alt="events image" />

        )}

        
        </Col>
        <div className='mt-4'> Share on:

        <a style={{textDecoration:'none'}} href={"https://twitter.com/intent/tweet?url="+events.url+`&text=${encodeURI("Check   "+events.name+"\n")}`} target="_blank"><TwitterIcon size={32} round/></a>

       <a style={{textDecoration:'none'}} href={"https://www.facebook.com/sharer/sharer.php?u="+events.url} target="_blank"> <FacebookIcon size={32}
          round /> </a>
    
  



        </div>
       
      </Row>
      </Container>

        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        {(artistData.length==0)&& (<NoResultsFoundAlert text = 'No Artists Found'/>)}
        {(artistData.length==1)&&
              artistData.map((item, key)=>(

                <ArtistsDisplay item={item}/>


              ))}
  {(artistData.length>1) &&
<Carousel indicators={false} interval={null}>

  {artistData.length>0 &&
    artistData.map((item, key)=>(
      <Carousel.Item key={key}>

        <ArtistsDisplay item={item}/>
     
      </Carousel.Item>
      
    ))}


</Carousel>
          }
        

        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>

          <Row>
            <Col className='col-12 col-sm-6'>
            {venueData.name!='' && (<p><h5> Name </h5> {venueData.name}</p>)}
              <br>
              </br>
          {venueData.address!='' && (<p><h5> Address </h5> {venueData.address}</p>)}

              <br>
              </br>
              {venueData.ph!='' && (<p><h5> Phone Number </h5> {venueData.ph}</p>)}


             
              <br>
              </br>


            </Col>

            <Col>
           
            {venueData.ophrs!='' && (
              <>
            <h5>Open Hours</h5>
            <ShowMoreText
                /* Default options */
                lines={2}
                more={<p style={{color:'#ADD8E6'}}>Show More <i class="arrow down"></i></p>}
                less={<p style={{color:'#ADD8E6'}}>Show Less <i class="arrow up"></i></p>}
                className="content-css show-more-text"
                anchorClass="show-more-less-clickable"
                onClick={(e)=>executeOnClick(e)}
                expanded={false}
                truncatedEndingComponent={<br></br>}
                width={"286"}
                

            >
               {venueData.ophrs}
               <br></br>

             
            </ShowMoreText>
            </>
        )}

{venueData.gr!='' && (
        <>

            <h5>General Rule</h5>
            <ShowMoreText
                /* Default options */
                lines={2}
                more={<p style={{color:'#ADD8E6'}}>Show More <i class="arrow down"></i></p>}
                less={<p style={{color:'#ADD8E6'}}>Show Less <i class="arrow up"></i></p>}
                className="content-css show-more-text"
                anchorClass="show-more-less-clickable"
                onClick={(e)=>executeOnClick(e)}
                expanded={false}
                truncatedEndingComponent={<br></br>}
                width={"286"}


            >
                {venueData.gr}
                <br></br>

            </ShowMoreText>
            </>
)}

{venueData.cr!='' && (
<>
            <h5>Child Rule</h5>

            <ShowMoreText
                /* Default options */
                lines={2}
                more={<p style={{color:'#ADD8E6'}}>Show More <i class="arrow down"></i></p>}
                less={<p style={{color:'#ADD8E6'}}>Show Less <i class="arrow up"></i></p>}
                className="content-css show-more-text"
                anchorClass="show-more-less-clickable"
                onClick={(e)=>executeOnClick(e)}
                expanded={false}
                truncatedEndingComponent={<br></br>}
                width={"286"}

            >
                {venueData.cr}
                <br></br>
            </ShowMoreText>

            </>

)}

            </Col>
            <div className="d-flex justify-content-center">
            <Button className='xm' variant="danger" onClick={handleMap}>
        Show venue on Google map
      </Button>

      <Modal show={showMap} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Event Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>

    
        {isLoaded && <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: venueData.lat ,
          lng: venueData.lon
        }}
        zoom={14}
      >
          <MarkerF
      onLoad={(marker)=>{  console.log('marker: ', marker)
    }}
   
      position={{
        lat: venueData.lat ,
        lng: venueData.lon
      }}
    />
      </GoogleMap>}

       

        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
      </div>

          </Row>
        </TabPanel>
      </SwipeableViews>

      </div>



    

    </Card>

  )}

</div>

      </Fragment>
  
  );
}

export default BasicExample;
