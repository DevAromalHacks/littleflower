"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";

export default function WhyUs() {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="py-16 bg-gray-200 px-4">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#002366] mb-4 lg:mb-6">
          Why Little Flower
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 100 },
          }}
          transition={{ duration: 0.5 }}
          className="card w-full md:w-1/2 lg:w-1/4 xl:w-1/5 bg-[#00AEEF] rounded-md shadow-lg"
        >
          <Image
            src="/images/sports1.jpg"
            alt="Card 1"
            width={400}
            height={250}
            className="rounded-t-md"
          />
          <div className="card-content p-4 text-white">
            <h2 className="text-lg font-bold mb-2">Academic Support</h2>
            <p className="text-sm">
              We provide comprehensive academic support to ensure every student excels.
            </p>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 100 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card w-full md:w-1/2 lg:w-1/4 xl:w-1/5 bg-[#00AEEF] rounded-md shadow-lg"
        >
          <Image
            src="/images/sports1.jpg"
            alt="Card 2"
            width={400}
            height={250}
            className="rounded-t-md"
          />
          <div className="card-content p-4 text-white">
            <h2 className="text-lg font-bold mb-2">Integrated Learning</h2>
            <p className="text-sm">
              Our curriculum integrates traditional and modern teaching methods for a holistic education.
            </p>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 100 },
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card w-full md:w-1/2 lg:w-1/4 xl:w-1/5 bg-[#00AEEF] rounded-md shadow-lg"
        >
          <Image
            src="/images/sports1.jpg"
            alt="Card 3"
            width={400}
            height={250}
            className="rounded-t-md"
          />
          <div className="card-content p-4 text-white">
            <h2 className="text-lg font-bold mb-2">Problem Solving</h2>
            <p className="text-sm">
              We emphasize critical thinking and problem-solving skills in our students.
            </p>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 100 },
          }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="card w-full md:w-1/2 lg:w-1/4 xl:w-1/5 bg-[#00AEEF] rounded-md shadow-lg"
        >
          <Image
            src="/images/sports1.jpg"
            alt="Card 4"
            width={400}
            height={250}
            className="rounded-t-md"
          />
          <div className="card-content p-4 text-white">
            <h2 className="text-lg font-bold mb-2">Holistic Activities</h2>
            <p className="text-sm">
              We offer a range of extracurricular activities to support the holistic development of students.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
