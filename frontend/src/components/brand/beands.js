import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const Brand = () => {

    const [brand, setBrand] = useState([]);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { token, isLoggedIn } = useSelector((state) => {


        return {
            token: state.auth.token,
            isLoggedIn: state.auth.isLoggedIn,
        };
    });



    const brandD = () => {
        axios.get(`http://localhost:5000/brand`).then((result) => {
            setBrand(result.data.result)
            console.log(result.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    useEffect(brandD, []);

    // const clickbrand = ()=>{

    //     axios.get(`http://localhost:5000/brand/${id}`).then((result)=>{

    //     }).catch((err)=>{
    //         console.log(err);
    //     })

    // }


    return (
        <div>
            {brand.length &&
                brand.map((element, index) => {
                    return (
                        <div key={index} >
                            <img src={`${element.image}`} />
                            <div >
                                <p>{"Drand  :" + element.brand}</p>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};


export default Brand;