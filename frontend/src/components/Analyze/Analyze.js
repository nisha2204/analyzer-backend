import React,{ useState} from 'react';
// import { getData } from '../../api';
import "./Analyze.css";
// import {useHistory} from "react-router-dom";
import axios from "axios";
import Main from '../main/Main';
import "../main/main.css"
//import Navbar1 from '../navbar/Navbar1';
import Navbar from  "../Navbar";


const Analyze = () => {
  const [country, setCountry] = useState('');
  const [asin, setAsin] = useState('');
  const [msg, setMsg] = useState('');
 const [loading, setLoading] = useState(false);

//  const addasin = async (e) => {
//   e.preventDefault();
//   try {
//       await axios.post('http://localhost:5000/addasin', {
//           asin: asin,
//       });
//       //navigate("/dashboard");
//   } catch (error) {
//       if (error.response) {
//           setMsg(error.response.data.msg);
//       }
//   }
// }

const handleSubmit = async (e) => {
  e.preventDefault();

  if(country !== '' && asin !== ''){
    setLoading(true);
  }
  try {
    await axios.post('http://localhost:5000/addasin', {
        asin: asin
    });
    console.log(typeof(asin))
    //navigate("/dashboard");
} catch (error) {
    if (error.response) {
        setMsg(error.response.data.msg);
    }
}
}


  return (
    <>
    <Navbar/>
    {!loading ? (
      <div className="container1">
      <div className="title">
        <h1>Analyze product listings with Listing Analyzer</h1>
        <p>Research up to 10 Amazon product listings to see the quality of your and your competitors’ listings.</p>
      </div>
      <div className="option-container">
      <label id="type">Choose a country</label>

<select name="cars" id="type" value={country} onChange={(e) => setCountry(e.target.value)}>
<option value="">option</option>
<option value="US">US</option>
<option value="IN">IN</option>
<option value="AU">AU</option>
<option value="CA">CA</option>
</select>
      </div>
      <div className="action">
          <input type="text" value={asin} onChange={(e)=> setAsin(e.target.value)} placeholder="Enter ASIN"/>
          <button type="submit" onClick={handleSubmit}>Analyze</button>
          

      </div>
  </div>
    ) : <Main country={country} asin={asin}  />
    }
    </>
    
  )
}

export default Analyze;