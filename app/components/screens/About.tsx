import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="pb-20 pt-20 px-4">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="w-full lg:w-[500px] flex justify-center">
          <Image
            src="/aboutco.avif"
            alt="about"
            width={600}
            height={600}
            className="w-full h-auto max-w-[300px] sm:max-w-[400px] lg:max-w-full"
          />
        </div>

        <div className="text-center lg:text-left max-w-lg">
          <div>
            <h2 className="text-2xl  lg:justify-start mb-2">
              <span className="border-l-4 border-1 border-teal-800 mr-2 h-full"></span>
              Who We Are
            </h2>
            <h2 className="text-3xl md:text-4xl pb-4 text-teal-800 font-semibold">
              About Little Flower English Medium Higher Secondary School
            </h2>
          </div>
          <p className="text-base md:text-lg pb-4">
            At Little Flower School, we empower young minds to excel and grow. Since
            our affiliation with the Central Board of Secondary Education in
            1997, we’ve strived to nurture each student’s potential through a
            balanced focus on academics and co-curricular activities. Our
            well-equipped labs, resourceful library, and dedicated sports
            facilities provide students with every tool they need to explore,
            innovate, and lead. With discipline, integrity, and a passion for
            learning at our core, we’re dedicated to shaping confident,
            resilient individuals ready to make their mark on the world.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link href="#">
              <button className="bg-yellow-500 px-8 py-3 md:px-10 md:py-4 font-bold text-white hover:bg-teal-800 transition-all duration-200">
                Discover More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
