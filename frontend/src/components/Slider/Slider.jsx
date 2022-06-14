import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";
import styles from "./Slider.module.css";

export default function Slider() {
  const slideImages = [
    "https://cdn.pixabay.com/photo/2020/07/06/01/33/forest-5375005_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/02/24/15/41/wolf-647528_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/01/21/15/54/books-5937716_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/04/23/21/59/tree-736875_960_720.jpg",
    "https://cdn.pixabay.com/photo/2014/05/03/00/56/summerfield-336672_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/03/17/14/05/sparkler-677774_960_720.jpg",
  ];

  return (
    <div className={styles.container}>
      <Slide easing="ease">
        {slideImages.map((slide, index) => {
          return (
            <div className={styles.slide} key={slide}>
              <div style={{ backgroundImage: `url(${slideImages[index]})` }}>
                <span>Slide {index + 1}</span>
              </div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
}
