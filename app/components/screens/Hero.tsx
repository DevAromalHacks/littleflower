"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

interface Slide {
  image: string;
  caption: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: "/images/school_auto_x2.jpg",
    caption: "Little Flower English Medium Higher Secondary School",
    description: "A place where dreams take flight and futures are shaped.",
  },
  {
    image: "/bg2co.avif",
    caption: "Heading back to school?",
    description: "Embrace the journey of learning and discovery.",
  },
  {
    image: "/bg3co.avif",
    caption: "Building a Brighter Tomorrow",
    description: "Together, we cultivate the leaders of tomorrow.",
  },
  {
    image: "/bg4co.avif",
    caption: "Where Knowledge Meets Excellence",
    description: "Join us in a pursuit of excellence and lifelong learning.",
  },
];

const SideBanner = dynamic(() => import("../includes/SideBanner"), {
  ssr: false,
});

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="h-screen w-full relative overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${slides[index].image})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50">
        <div className="text-center px-4 md:px-8 mt-40">
          <h1 className="font-nunito font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] mx-auto">
            {slides[index].caption}
          </h1>
          <p className="font-nunito text-gray-300 font-bold text-sm sm:text-xl md:text-2xl lg:text-xl mt-4">
            {slides[index].description}
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-yellow-500 px-8 py-3 md:px-10 md:py-4 font-bold text-white hover:bg-teal-800 transition-all duration-200 mt-6"
          >
            Discover More
          </motion.button>
        </div>
      </div>
      <SideBanner />
    </section>
  );
}
