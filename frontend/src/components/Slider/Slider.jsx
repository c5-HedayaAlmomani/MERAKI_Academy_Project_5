import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";
import styles from "./Slider.module.css";

export default function Slider() {
  const slideImages = [
    "https://res.cloudinary.com/hudhud/image/upload/v1655388711/maxqgc69/cnxmnnd04zbb6ztobc38.png",

    "https://res.cloudinary.com/hudhud/image/upload/v1655388971/maxqgc69/wuvui6c6szdmy38bfr9m.png",
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
