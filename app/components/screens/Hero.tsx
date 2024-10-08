"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../includes/Navbar";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Hero() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="relative block md:block lg:block">
      <div
        style={{
          backgroundImage: "url('/images/school_auto_x2.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 w-full px-4">
          <Navbar />
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 100 },
            }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-roboto text-white relative z-50 font-serif mb-6">
              Empowering Minds, Igniting Futures: <br /> Welcome to Little Flower
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-200 text-black mt-5 rounded-md px-8 py-3 hover:bg-gray-300 transition duration-300 ease-in-out font-bold"
                >
                  Contact us
                </motion.button>
              </Link>
              <Link href="/enroll">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-cyan-500 mt-5 text-black rounded-md px-8 py-3 hover:bg-cyan-700 transition duration-300 ease-in-out font-bold"
                >
                  Enroll Now
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="fixed bottom-10 right-10 z-20">
          <div className="w-16 h-16 flex justify-center items-center">
            <button onClick={toggleChat} className="outline-none focus:outline-none">
              <Image
                src="/icons/bot.png"
                alt="chatbot"
                width={64}
                height={64}
                className="w-full cursor-pointer z-50 shadow-purple-600 hover:shadow-lg transition duration-300 ease-in-out"
              />
            </button>
          </div>
        </div>
        {isChatOpen && (
          <div className="fixed lg:bottom-24 bottom-8 md:bottom-24 right-16 md:right-20 lg:right-40  p-4 z-20 rounded-lg shadow-lg w-64">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/QqtxZYwWGfVdWEM5qzEow"
              className="w-96 h-[500px]"
              frameBorder="0"
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
}
