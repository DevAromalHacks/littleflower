// import Image from "next/image";

// interface LevelProps {
//   src: string;
//   alt: string;
//   width: number;
//   height: number;
//   title: string;
// }

// export default function Levels() {
//   return (
//     <section className="py-20">
//       <div>
//         <h1 className="text-3xl font-bold text-orange text-center pb-20 text-shadow-orange">
//           Our Levels
//         </h1>
//         <div className="hidden lg:block md:block sm:block">
//           <div className="flex flex-wrap items-center justify-center gap-5">
//             <Level
//               src="/images/kg.png"
//               alt="image"
//               width={200}
//               height={200}
//               title="kg"
//             />
//             <Level
//               src="/images/kg.png"
//               alt="image"
//               width={200}
//               height={200}
//               title="kg"
//             />
//             <Level
//               src="/images/kg.png"
//               alt="image"
//               width={200}
//               height={200}
//               title="kg"
//             />
//             <Level
//               src="/images/kg.png"
//               alt="image"
//               width={200}
//               height={200}
//               title="kg"
//             />
//             <Level
//               src="/images/kg.png"
//               alt="image"
//               width={200}
//               height={200}
//               title="kg"
//             />
//           </div>
//         </div>
//         <div className="block lg:hidden md:hidden sm:hidden">
//           <div className="flex flex-wrap items-center justify-center gap-5">
//             <Level
//               src="/images/kg.png"
//               alt="image"
//               width={150}
//               height={150}
//               title="kg"
//             />
//             <Level
//               src="/images/kg.png"
//               alt="image"
//               width={150}
//               height={150}
//               title="kg"
//             />
//             <Level
//               src="/images/kg.png"
//               alt="image"
//               width={150}
//               height={150}
//               title="kg"
//             />
//             <Level
//               src="/images/kg.png"
//               alt="image"
//               width={150}
//               height={150}
//               title="kg"
//             />
//             <Level
//               src="/images/kg.png"
//               alt="image"
//               width={150}
//               height={150}
//               title="kg"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Level({ src, alt, width, height, title }: LevelProps) {
//   return (
//     <div className="">
//       <Image src={src} alt={alt} width={width} height={height} />
//       <div className="w-44 bg-neutral-600 h-8 relative -top-4">
//         <h1>{title}</h1>
//       </div>
//     </div>
//   );
// }

"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function OurMission() {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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
      <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
        <motion.div
          ref={ref}
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
          ref={ref}
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
          ref={ref}
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
