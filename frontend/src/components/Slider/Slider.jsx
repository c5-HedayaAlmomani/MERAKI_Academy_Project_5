import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";
import styles from "./Slider.module.css";

export default function Slider() {
  const slideImages = [
    

    "https://res.cloudinary.com/hudhud/image/upload/v1655495658/maxqgc69/jehad1_i9xffo.jpg",

    "https://res.cloudinary.com/hudhud/image/upload/v1655499351/maxqgc69/jehad7_rcokqu.jpg",

    "https://res.cloudinary.com/hudhud/image/upload/v1655499365/maxqgc69/jehad8_jfs2on.jpg",


    "https://res.cloudinary.com/hudhud/image/upload/v1655497966/maxqgc69/jehad6_ewmpn4.jpg",
    "https://res.cloudinary.com/hudhud/image/upload/v1655499393/maxqgc69/jehad10_yakvn3.jpg",
    
  ];

  return (
    <div className={styles.container}>
      <Slide easing="ease">
        {slideImages.map((slide, index) => {
          return (
            <div className={styles.slide} key={slide}>
              <div style={{ backgroundImage: `url(${slideImages[index]})` }}>
                {/* <span>Slide {index + 1}</span> */}
                {/* <span>ECMA </span> */}
              </div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
}
