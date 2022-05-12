import axios from "axios";



export const getData = async (asin,coun) => {

    try {
        console.log(coun,"hel");
      const  {data} = await axios.get(`https://amazon23.p.rapidapi.com/product-details`, {
        params: 
            // {asin: 'B07XQXZXJC', country: 'US'},
            {asin: asin, country: coun},
       
        headers: {
            'X-RapidAPI-Host': 'amazon23.p.rapidapi.com',
            'X-RapidAPI-Key': '36e3b556femsh786e05b6e943defp160b52jsn3290a24efd7f'
        },
      });
      
  
      console.log(data,"kkk");
    
      return data.result[0];
    } catch (error) {
      console.log(error);
    }
  };