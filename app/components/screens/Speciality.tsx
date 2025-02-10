/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState, RefObject } from "react";
import CountUp from "react-countup";

const SchoolSpecialties: React.FC = () => {
  const counterRefs: RefObject<HTMLDivElement>[] = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleIntersection: IntersectionObserverCallback = (
    entries,
    observer
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    const options: IntersectionObserverInit = {
      threshold: 0.25,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    counterRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [counterRefs]);

  return (
    <section
      className="bg-white py-16 bg-floral mix-blend-multiply"
      id="specialty"
    >
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          <span className="border-l-4 border-teal-800 mr-2"></span>Our
          School&apos;s Achievements
        </h2>
        <h2 className="text-3xl sm:text-4xl pt-2 pb-6 sm:pb-8 text-teal-800 font-bold">
          Discover Our Success
        </h2>
      </div>

      <div className="specialties-wrapper">
        <div className="flex flex-wrap justify-center items-center gap-5">
          <div
            ref={counterRefs[0]}
            className="w-40 h-40 sm:w-64 sm:h-64 flex flex-col items-center justify-center text-white bg-teal-500 rounded-full"
          >
            <div>
              {isVisible && (
                <div className="flex items-center">
                  <h2 className="text-2xl lg:text-4xl md:text-4xl font-bold">
                    <CountUp start={0} end={1200} duration={2} delay={0} />
                    <span>+</span>
                  </h2>
                </div>
              )}
            </div>
            <div>
              <p className="text-xl lg:text:2xl md:text-2xl">Students</p>
            </div>
          </div>

          <div
            ref={counterRefs[1]}
            className="w-40 h-40 sm:w-64 sm:h-64 flex flex-col items-center justify-center text-white bg-teal-500 rounded-full"
          >
            <div>
              {isVisible && (
                <div className="flex items-center">
                  <h2 className="text-2xl lg:text-4xl md:text-4xl font-bold">
                    <CountUp start={0} end={80} duration={2} delay={0} />
                    <span>+</span>
                  </h2>
                </div>
              )}
            </div>
            <div>
              <p className="text-xl lg:text:2xl md:text-2xl">Teachers</p>
            </div>
          </div>

          <div
            ref={counterRefs[2]}
            className="w-40 h-40 sm:w-64 sm:h-64 flex flex-col items-center justify-center text-white bg-teal-500 rounded-full"
          >
            <div>
              {isVisible && (
                <div className="flex items-center">
                  <h2 className="text-2xl lg:text-4xl md:text-4xl font-bold">
                    <CountUp start={0} end={30} duration={2} delay={0} />
                    <span>+</span>
                  </h2>
                </div>
              )}
            </div>
            <div>
              <p className="text-xl lg:text:2xl md:text-2xl">Clubs</p>
            </div>
          </div>

          <div
            ref={counterRefs[3]}
            className="w-40 h-40 sm:w-64 sm:h-64 flex flex-col items-center justify-center text-white bg-teal-500 rounded-full"
          >
            <div>
              {isVisible && (
                <div className="flex items-center">
                  <h2 className="text-2xl lg:text-4xl md:text-4xl font-bold">
                    <CountUp start={0} end={15} duration={2} delay={0} />
                    <span>+</span>
                  </h2>
                </div>
              )}
            </div>
            <div>
              <p className="text-xl lg:text:2xl md:text-2xl">Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolSpecialties;
