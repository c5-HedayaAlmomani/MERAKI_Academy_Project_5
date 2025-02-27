import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import("./style.css");

const Category = () => {
    const [allcat, setAllcat] = useState([]);

    const clickbrand = () => {

        axios.get(`http://localhost:5000/category`).then((result) => {
            setAllcat(result.data.result)
            console.log(result.data.result);
            // console.log(result);
        }).catch((err) => {
            console.log(err);
        })

    }



    useEffect(clickbrand, [])

    return (<div className="categoryContenar">
        {allcat.length&&allcat.map((element,index)=>{
            return <div key={index} className= "categoryCont">
                 <img src={element.image}></img>
                <p>{element.category}</p>
               
            </div>
        })
        }
    </div>)

}


export default Category;