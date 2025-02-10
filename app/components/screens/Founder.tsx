import Image from "next/image";
import Link from "next/link";

export default function Founder() {
  return (
    <section className="bg-gray-100 p-10 sm:p-20 bg">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="text-center lg:text-left max-w-lg">
          <h2 className="text-2xl  lg:justify-start mb-2">
            <span className="border-l-4 border-teal-800 mr-2"></span>
            Founder&apos;s Message
          </h2>
          <h2 className="text-3xl md:text-4xl pb-4 text-teal-800 font-semibold">
            Look what our founder says
          </h2>
          <p className="text-base md:text-lg pb-4">
            We are a prestigious institution committed to preparing children for
            future challenges. At Little Flower, we emphasize excellence in academics
            and values like discipline, courtesy, and social sensitivity. Our
            vision is to foster holistic development, empowering students to
            become responsible contributors to society. Through innovative
            online and offline programs, we nurture creativity and
            out-of-the-box thinking. With a strong focus on academic success and
            the physical, mental, and emotional well-being of students, we aim
            to shape their fullest potential under expert guidance.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link href="#">
              <button className="bg-yellow-500 px-8 py-3 md:px-10 md:py-4 font-bold text-white hover:bg-teal-800 transition-all duration-200">
                Discover More
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-[500px] flex justify-center">
          <Image
            src="/aboutco.avif"
            alt="about"
            width={600}
            height={600}
            className="w-full h-auto max-w-[300px] sm:max-w-[400px] lg:max-w-full"
          />
        </div>
      </div>
    </section>
  );
}
