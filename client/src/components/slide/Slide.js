import React, { useState, useRef, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

function Slide({ imgs }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef();

  const moveTo = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    slideRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, [currentIndex]);
  return (
    <div className="relative md:max-w-screen-sm overflow-x-hidden">
      <div className="flex transition ease-in-out" ref={slideRef}>
        {imgs.map((img) => (
          <img key={img} src={img} alt={img} />
        ))}
      </div>
      <div>
        {currentIndex !== 0 && (
          <span
            className="absolute top-1/2 left-0 cursor-pointer text-5xl text-white transform -translate-y-1/2"
            onClick={() => moveTo(currentIndex - 1)}
          >
            <MdKeyboardArrowLeft />
          </span>
        )}
        {currentIndex !== imgs.length - 1 && (
          <span
            className="absolute top-1/2 right-0 cursor-pointer text-5xl text-white transform -translate-y-1/2"
            onClick={() => moveTo(currentIndex + 1)}
          >
            <MdKeyboardArrowRight />
          </span>
        )}
      </div>
      <div className="flex mt-2 justify-center">
        {imgs.map((v, i) => (
          <span
            key={i}
            className={
              currentIndex === i
                ? 'w-4 h-4 mx-1 bg-black rounded-full  cursor-pointer'
                : 'w-4 h-4 mx-1 bg-gray-400 rounded-full cursor-pointer'
            }
            onClick={() => moveTo(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Slide;
