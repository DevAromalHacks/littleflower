"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function OurMission() {
  const controls = useAnimation();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isLargeScreen && inView) {
      controls.start("visible");
    } else if (!isLargeScreen) {
      controls.start("visible");
    }
  }, [controls, inView, isLargeScreen]);

  return (
    <section className="py-16 bg-white px-4">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#002366] mb-4 lg:mb-6">
          Our Mission
        </h1>
        <p className="text-lg text-gray-700 max-w-screen-md mx-auto">
          At Little Flower, we strive to nurture each student's potential and
          provide a comprehensive education that fosters intellectual growth,
          emotional resilience, and social responsibility.
        </p>
      </div>
      <div ref={isLargeScreen ? ref : null} className="flex flex-wrap justify-center gap-8 lg:gap-16">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -100 },
          }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 lg:w-1/3 bg-[#00AEEF] rounded-md shadow-lg"
        >
          <div className="p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Innovative Learning</h2>
            <p className="text-sm">
              We embrace innovative teaching methods to provide a dynamic and
              engaging learning environment that prepares students for future
              success.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: 100 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2 lg:w-1/3 bg-[#00AEEF] rounded-md shadow-lg"
        >
          <div className="p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Community Engagement</h2>
            <p className="text-sm">
              We foster a sense of community and encourage students to actively
              participate in community service and social initiatives.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -100 },
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full md:w-1/2 lg:w-1/3 bg-[#00AEEF] rounded-md shadow-lg"
        >
          <div className="p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Holistic Development</h2>
            <p className="text-sm">
              We prioritize the holistic development of our students, ensuring
              they grow intellectually, emotionally, and socially.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
