import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import image1 from '../../../assets/1.jpg';
import image2 from '../../../assets/2.jpg';
import image3 from '../../../assets/3.jpg';
import image4 from '../../../assets/4.jpg';

const images = [image1, image2, image3, image4];

const Carousel = () => {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const x = useMotionValue(0);

  const getSlideStyle = (index) => {
    const currentDragOffset = x.get();
    const slideWidth = carouselRef.current?.offsetWidth || 0;

    if (slideWidth === 0) {
      return { scale: 1, opacity: 1 };
    }

    const targetXForIndex = -index * slideWidth;
    const diff = Math.abs(currentDragOffset - targetXForIndex);
    const distanceFactor = Math.min(1, diff / slideWidth);
    const scaleValue = 1 - (distanceFactor * 0.15);
    const opacityValue = 1 - (distanceFactor * 0.4);

    return { scale: scaleValue, opacity: opacityValue };
  };

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const goToSlide = (index) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      setCurrentIndex(index);
      x.set(-index * slideWidth, { transition: { type: "spring", stiffness: 200, damping: 30 } });
    }
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    goToSlide(nextIndex);
  };

  const goToPrev = () => {
    const nextIndex = (currentIndex - 1 + images.length) % images.length;
    goToSlide(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-2xl bg-gray-900">
      <motion.div
        ref={carouselRef}
        className="flex cursor-grab items-center"
        whileTap={{ cursor: "grabbing" }}
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        style={{ x }}
        onDragEnd={(event, info) => {
          const velocity = info.velocity.x;
          const currentOffset = x.get();
          const slideWidth = carouselRef.current.offsetWidth;

          let targetIndex = currentIndex;
          if (velocity < -500) {
            targetIndex = Math.min(images.length - 1, currentIndex + 1);
          } else if (velocity > 500) {
            targetIndex = Math.max(0, currentIndex - 1);
          } else {
            targetIndex = Math.round(currentOffset / -slideWidth);
            targetIndex = Math.max(0, Math.min(images.length - 1, targetIndex));
          }
          goToSlide(targetIndex);
        }}
      >
        {images.map((image, index) => {
          const { scale: slideScale, opacity: slideOpacity } = getSlideStyle(index);

          return (
            <motion.div
              key={index}
              className="flex-shrink-0 w-full h-[500px] flex items-center justify-center relative"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                scale: slideScale,
                opacity: slideOpacity,
                borderRadius: '8px',
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <div className="relative z-10 text-white text-3xl font-bold drop-shadow-lg">
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-4 rounded-full hover:bg-opacity-40 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-4 rounded-full hover:bg-opacity-40 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </button>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-gray-400 bg-opacity-75 hover:bg-opacity-100'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel; 