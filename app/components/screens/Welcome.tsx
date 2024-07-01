"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="welcome bg-white">
      <div className="flex gap-10 py-20 flex-wrap items-center justify-center">
        <div>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: { opacity: 0, scale: 0.5 },
            }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/school_mod.jpg"
              alt="School Image"
              width={400}
              height={400}
              className="rounded-full shadow-lg"
            />
          </motion.div>
        </div>
        <div>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: -100 },
            }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="welcome-head text-center text-2xl md:text-3xl font-bold text-[#002366] mb-4 lg:mb-6">
                Welcome to Our School
              </h1>
              <div className="relative">
                <div className="w-64 h-64 rounded-md bg-[#00AEEF] filter-blur absolute -z-10"></div>
              </div>
              <p className="welcome-para max-w-screen-md text-center text-lg lg:text-md lg:px-4 mb-6 text-[#333333]">
                Welcome to Little Flower English Medium Higher Secondary School! Nestled in the serene locale of Edava, Thiruvananthapuram, Kerala, we are dedicated to delivering academic excellence. Guided by our committed teachers, we prioritize child-centered learning and holistic development, enriching the educational journey of every student.
              </p>
              <div className="flex items-center justify-center">
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="welcome-button bg-[#002366] text-white rounded-md px-8 py-3 text-lg hover:bg-[#333333] transition duration-300 ease-in-out"
                  >
                    Read More
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
