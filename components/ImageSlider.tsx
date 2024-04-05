import Image from "next/image";
import { useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

interface ImageSliderProps {
  productImages: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ productImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex === productImages.length - 1) setCurrentIndex(0);
    else setCurrentIndex(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex === 0) setCurrentIndex(productImages.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="overflow-hidden relative w-[72%]">
      <div
        className="flex transition ease-out duration-400"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {productImages?.map((productImage: string, index: number) => {
          return (
            <Image
              src={productImage}
              key={index}
              alt={`image-${index}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              width={500}
              height={300}
              
            />
          );
        })}
      </div>
      <div className="absolute top-0 h-full w-full justify-between items-center flex text-blue-400 px-5 text-3xl">
        <button onClick={prevSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>
      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {productImages.map((p, i) => {
          return (
            <div
              onClick={() => {
                setCurrentIndex(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-4 h-4 cursor-pointer ${
                i == currentIndex ? "bg-blue-400" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
