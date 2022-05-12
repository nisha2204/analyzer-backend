
import React,{useEffect,useState} from 'react';

import tick from "./tick3.png";
import cross from "./cross.png";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getData } from '../../api';
// import axios from "axios";
import "./main.css";

function Main({country,asin}){
    const [data,setData] = useState({});
    const [imageDimensions, setImageDimensions] = useState({});
   


useEffect(async() => {
      setData(await getData(asin,country));
},[]);

const setImageSize = (setImageDimensions, imageUrl) => {
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    setImageDimensions({
      height: img.height,
      width: img.width
    });
  };
  img.onerror = (err) => {
    console.log("img error");
    console.error(err);
  };
};

useEffect(()=>{
  // setImageSize(setImageDimensions, data?.main_image);
  setImageSize(setImageDimensions,`https://cdn0.vox-cdn.com/hermano/verge/product/image/9315/bfarsace_120612_3970_0001_squ.jpg`);
  console.log(imageDimensions);

},[])

var x=10;
//var percentage=60;
var title=data?.title;
var stitle=String(title);
var stringLength=stitle?.length;
var featureBullets=data?.feature_bullets;
//var description= data?.description;
//var sdescription=String(description);
//var lendes=sdescription?.length;
var cnt=0;
var cnt1=0;
var cnt2=0;
var score=0;


const isEmoji = (s)=>{
  var format = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;

  if(format.test(s)){
  return true;
  } else {
  return false;
  }
}

const startsWithCapital=(word)=>{
  return word.charAt(0) === word.charAt(0).toUpperCase()
}
const ALlCapital=(word)=>{
  return word === word.toUpperCase()
}

data?.feature_bullets?.map((info)=>(<p>{String(info).length<150 ? cnt++ : null }</p>
          ))
data?.feature_bullets?.map((info)=>(<p>{ALlCapital(String(info))===true ? cnt1++ : null }</p>
          ))
data?.feature_bullets?.map((info)=>(<p>{startsWithCapital(String(info))===false? cnt2++ : null }</p>
          ))

const calculatescore=()=>{
  if(isEmoji(title)!=true){
    score++;
  }
  if(stringLength>=150){
    score++;
  }
  if(featureBullets?.length>=5){score++}
  if(cnt2<=0){
    score++;
  }
  if(cnt1<=0){
    score++;
  }
  if(x>20){
    score++;
  }
  if(data?.images?.length > 7){
    score++;
  }
  if(data?.videos?.length >0){
    score++;
  }
  if(data?.reviews?.total_reviews > 20){
    score++;
  }
  if(parseFloat(data?.reviews?.rating) > 4){
    score++;
  }
  if(data?.reviews?.answered_questions >10){
    score++;
  }
  if(Object.keys(imageDimensions)?.length !== 0){
    if(imageDimensions?.height +1>1000 && imageDimensions?.width+1 >1000){
      score++;
    }
  }
}
calculatescore();
var percentage=parseInt((score/11)*100);
console.log(data,"ehll");
// const onImgLoad = ({ target: img }) => {
//   const { offsetHeight, offsetWidth } = img;
//   console.log(offsetHeight, offsetWidth);
// };


    return (
        <div>
          <div className='container2'>
            <h1 style={{color: "#31335A"}}>Listing Quality Analysis</h1>
            </div>
          <div className="container">
            <div className="row">
              <div className="column1">
                <h1 style={{paddingBottom:"30px"}}>Listing Score</h1>
                <div style={{width:"200px", paddingBottom:"30px"}}><CircularProgressbar value={percentage} text={`${percentage}%`} /></div>
                {/* <img src={tick}/>
                <p>Product Title</p> */}
                
                <h4 style={{color: "#31335A"}}>{title}</h4>
              </div>
              <div className="column2">
                <h1> Copy Breakdown</h1>
                <div className="text">
                <p>Title does not contain emojis</p>
                {isEmoji(title) === true ? <img src={cross} alt={cross}/> : <img src={tick} alt={cross}/>}
                </div>
                <hr/>
                <div className="text">
                <p>Title contains 150+ characters</p>
                {stringLength>=150 ? <img src={tick} alt={cross}/> : <img src={cross} alt={cross}/>}
                
                </div>
                <hr/>
                <div className="text">
                <p>5+ bullet points</p>
                {featureBullets?.length>=5 ? <img src={tick} alt={cross}/> : <img src={cross} alt={cross}/>}
                
                </div>
                <hr/>
                <div className="text">
                <p>First letter of bullet point is capitalized</p>
                {cnt2>0 ? <img src={cross} alt={cross}/> : <img src={tick} alt={cross}/>}
                
                </div>
                <hr/>
                <div className="text">
                <p>Bullet point are not in all caps</p>
                {cnt1>0 ? <img src={cross} alt={cross}/> : <img src={tick} alt={cross}/>}
                
                </div>
                <hr/>
                {/* <div className="text">
                <p>1000+ characters in description</p>
                {lendes>1000? <img src={tick} alt={cross}/>: <img src={cross} alt={cross}/>}
                </div> */}
              </div>
              <div className="column3">
                <h1> Media Breakdown</h1>
                <div className="text">
                <p>1000 * 1000 px +</p>
                {/* <img
        onLoad={onImgLoad}
        alt=""
        style={{  }}
        src="https://i.picsum.photos/id/360/200/300.jpg?hmac=Fl1CgUfxrFjmcS1trYDG80XpEjYixcXfc2uTtCxFkDw"
      /> */}
                {/* {x>20 ? <img src={tick} alt={cross}/> : <img src={cross} alt={cross}/>} */}
                {Object.keys(imageDimensions)?.length !== 0 ? (
                 
                 (imageDimensions?.height +1>1000 && imageDimensions?.width+1 >1000) ?  <img src={tick} alt={tick}/> : <img src={cross} alt={cross}/> ): <img src={cross} alt={cross}/>
                }
                
                </div>
                <hr/>
                {/* <div className="text">
                <p>Main image is on white background</p>
                <img src={tick} alt={cross}/>
                </div>
                <hr/> */}
                <div className="text">
                <p>7+ images</p>
                { data?.images?.length > 7 ?  <img src={tick} alt={cross}/> : <img src={cross} alt={cross}/>}
                
               
                </div>
                <hr/>
                <div className="text">
                <p>Includes videos</p>
                {data?.videos?.length >0 ? <img src={tick} alt={cross}/>: <img src={cross} alt={cross}/>}
                
                </div>
                <h1>Review Breakdown</h1>
                <div className="text">
                <p>20+ reviews</p>
                { data?.reviews?.total_reviews > 20 ? <img src={tick} alt={cross}/> : <img src={cross} alt={cross}/>}
                
                </div>
                <hr/>
                <div className="text">
                <p>4+ average star rating</p>
                {parseFloat(data?.reviews?.rating) > 4 ? <img src={tick} alt={cross}/> : <img src={cross} alt={cross}/>}
                
                </div>
                <hr/>
                <div className="text">
                <p>No. of answered questions more than 10</p>
                {data?.reviews?.answered_questions >10 ? <img src={tick} alt={cross}/> : <img src={cross} alt={cross}/>}
                
                </div>
              </div>

            </div>
              
            
          </div>
        </div>
      );
}

export default Main ;