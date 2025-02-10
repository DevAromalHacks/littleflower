import Image from "next/image";
import { FaSchool, FaAward, FaBook, FaUsers } from "react-icons/fa";
import CustomHeader from "@/app/components/includes/CustomHeader";
import Footer from "@/app/components/screens/Footer";

export default function AboutUs() {
  return (
    <section>
      <CustomHeader />
      {/* Hero Section */}
      <section className="bg-school w-full h-[500px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-transparent opacity-80"></div>
        <h1 className="text-5xl font-bold text-white z-10">Who We Are</h1>
      </section>

      {/* Main About Section */}
      <div className="pt-20 px-8 md:px-20 lg:px-36 pb-20">
        <div className="grid md:grid-cols-2 items-center gap-16">
          {/* Image Section */}
          <div className="relative">
            <Image
              src="/bg1co.avif"
              alt="About"
              width={600}
              height={500}
              className="rounded-xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-teal-500/30 to-sky-500/50 rounded-xl"></div>
          </div>

          {/* Text Content */}
          <div className="text-gray-800 space-y-6">
            <h2 className="text-3xl font-semibold text-sky-500">
              Building Excellence Since 1992
            </h2>
            <p>
              The foundation stone of this institution was laid on 28th July
              1992 by Hon&apos;ble Minister for Education, Sri E.T. Mohammed
              Basheer, marking the beginning of a journey towards academic
              brilliance.
            </p>
            <p>
              Spread across 5 acres, our campus blends tradition and innovation,
              fostering a vibrant learning community. Recognized with accolades
              like the Varkala Lions&apos; Club Special Award, we empower
              future leaders.
            </p>
            <p className="text-teal-700 font-semibold">
              Join us on this extraordinary journey as we build a brighter
              future for the leaders of tomorrow.
            </p>
          </div>
        </div>
      </div>

      {/* Vision and Mission Section */}
      <section className="bg-gray-100 py-16 px-8 md:px-20 lg:px-36">
        <h2 className="text-3xl font-semibold text-sky-500 text-center mb-10">
          Vision & Mission
        </h2>
        <div className="grid md:grid-cols-2 gap-10 text-gray-800">
          <div className="bg-white p-6 shadow-md rounded-xl">
            <FaBook className="text-sky-500 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p>
              To nurture young minds with the knowledge, skills, and values
              necessary to lead and excel in a dynamic world.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-xl">
            <FaAward className="text-teal-500 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p>
              Empower students through quality education, innovation, and a
              supportive learning environment to achieve their fullest potential.
            </p>
          </div>
        </div>
      </section>

      {/* Key Milestones Section */}
      <section className="py-16 px-8 md:px-20 lg:px-36">
        <h2 className="text-3xl font-semibold text-sky-500 text-center mb-10">
          Key Milestones
        </h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaSchool className="text-teal-500 text-3xl" />
            <p>
              <strong>1992:</strong> The foundation stone was laid by Hon&apos;ble Minister
              for Education, Sri E.T. Mohammed Basheer.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <FaAward className="text-sky-500 text-3xl" />
            <p>
              <strong>2005:</strong> Achieved 100% pass rate in the SSLC
              examination, setting a benchmark of excellence.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <FaUsers className="text-teal-500 text-3xl" />
            <p>
              <strong>2006:</strong> Upgraded to Higher Secondary School, offering
              Science, Commerce, Computer Science, and Humanities.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="bg-gray-100 py-16 px-8 md:px-20 lg:px-36">
        <h2 className="text-3xl font-semibold text-sky-500 text-center mb-10">
          Our Facilities
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-gray-800">
          <div className="bg-white p-6 shadow-md rounded-xl">
            <FaSchool className="text-sky-500 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Smart Classrooms</h3>
            <p>
              Modern classrooms equipped with interactive technology to enhance
              learning experiences.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-xl">
            <FaBook className="text-teal-500 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Library</h3>
            <p>
              A vast collection of books and resources to support academic and
              personal growth.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-xl">
            <FaUsers className="text-sky-500 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Sports Facilities</h3>
            <p>
              Excellent sports infrastructure promoting fitness and teamwork
              among students.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </section>
  );
}
