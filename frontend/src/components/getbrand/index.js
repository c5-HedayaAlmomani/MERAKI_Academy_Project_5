import axios from "axios"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const Getbrand = () => {

    const { brands, category } = useSelector((state) => {
        return {

            brands: state.brands.brands,
            category: state.category.category
        };
    });
    return (<div>
        {brands.length &&
            brands.map((element, index) => {
                return (
                    <div key={index} className="branddiv">
                        {/* <img
                            onClick={() => {
                                // navigate(`/allCategory/${element.brand}`);
                            }}
                            src={`${element.image}`}
                        /> */}
                        <div className="branddiv">
                            <select><option>{"Drand  :" + element.brand}</option></select>
                            
                        </div>
                    </div>
                );
            })}
    </div>)
}

export default Getbrand
