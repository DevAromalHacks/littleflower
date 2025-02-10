"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jane Doe",
    title: "CEO",
    company: "Example Company",
    image: "/img-9.jpg",
    quote: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    id: 2,
    name: "June Doe",
    title: "CEO",
    company: "Example Company",
    image: "/img-5.jpg",
    quote: "Some quick example text to build on the card title and make up the bulk of the cards content.",
  },
  {
    id: 3,
    name: "John Doe",
    title: "CEO",
    company: "Example Company",
    image: "/img-4.jpg",
    quote: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    id: 4,
    name: "John Smith",
    title: "CEO",
    company: "Example Company",
    image: "/img-7.jpg",
    quote: "Another testimonial to showcase the user's experience.",
  },
  {
    id: 5,
    name: "Jane Smith",
    title: "CEO",
    company: "Example Company",
    image: "/img-8.jpg",
    quote: "An additional testimonial for variety.",
  },
];

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3); // Show 3 items on large screens
      } else {
        setItemsPerPage(1); // Show 1 item on small screens
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0 ? testimonials.length - itemsPerPage : prevIndex - itemsPerPage
    );
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="p-4">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          <span className="border-l-4 border-teal-800 mr-2"></span>Testimonial
        </h2>
        <h2 className="text-3xl sm:text-4xl pt-2 pb-6 sm:pb-8 text-teal-800 font-bold">
          See what parents say
        </h2>
      </div>

      <div className="flex items-center justify-center p-4">
        <button onClick={handlePrev} className="text-gray-500 w-20 h-20 mr-2 lg:mr-20 md:mr-20 bg-gray-200 rounded-full">
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>

        <div className="flex justify-center space-x-4">
          <AnimatePresence mode="wait">
            {visibleTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center max-w-xs"
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  height={100}
                  width={100}
                  className="rounded-full w-16 h-16 mb-2"
                />
                <p className="text-gray-700 text-sm italic mb-4">
                  &quot;{testimonial.quote}&quot;
                </p>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-gray-500 text-xs">
                  {testimonial.title}, {testimonial.company}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button onClick={handleNext} className="text-gray-500 w-20 h-20 ml-2 lg:ml-20 md:ml-20 bg-gray-200 rounded-full">
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
