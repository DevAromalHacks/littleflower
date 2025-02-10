import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faEye, faGraduationCap, faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function MissionVision() {
  return (
    <section className="px-6 sm:px-8 py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          <span className="border-l-4 border-teal-800 mr-2"></span>Our Mission and Vision
        </h2>
        <h2 className="text-3xl sm:text-4xl pt-2 pb-6 sm:pb-8 text-teal-800 font-bold">
          Inspiring Minds, Shaping Futures
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Mission Box */}
        <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-white text-center transition-transform transform hover:scale-105 hover:shadow-lg hover:border-teal-800">
          <FontAwesomeIcon icon={faBullseye} size="2x" className="text-teal-800 mb-4" />
          <h3 className="text-xl sm:text-2xl font-semibold text-teal-800 mb-3">Our Mission</h3>
          <p className="text-sm sm:text-md text-gray-700 leading-7">
            At Little Flower, our mission is to foster an environment where students are encouraged to achieve excellence, develop critical thinking, and contribute positively to society.
          </p>
        </div>

        {/* Vision Box */}
        <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-white text-center transition-transform transform hover:scale-105 hover:shadow-lg hover:border-teal-800">
          <FontAwesomeIcon icon={faEye} size="2x" className="text-teal-800 mb-4" />
          <h3 className="text-xl sm:text-2xl font-semibold text-teal-800 mb-3">Our Vision</h3>
          <p className="text-sm sm:text-md text-gray-700 leading-7">
            Our vision is to be a nurturing educational institution that shapes responsible, innovative, and resilient leaders for a better world.
          </p>
        </div>

        {/* Values Box */}
        <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-white text-center transition-transform transform hover:scale-105 hover:shadow-lg hover:border-teal-800">
          <FontAwesomeIcon icon={faGraduationCap} size="2x" className="text-teal-800 mb-4" />
          <h3 className="text-xl sm:text-2xl font-semibold text-teal-800 mb-3">Our Values</h3>
          <p className="text-sm sm:text-md text-gray-700 leading-7">
            We uphold values of integrity, respect, and resilience, creating an environment where students learn to act responsibly and compassionately.
          </p>
        </div>

        {/* Global Impact Box */}
        <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-white text-center transition-transform transform hover:scale-105 hover:shadow-lg hover:border-teal-800">
          <FontAwesomeIcon icon={faGlobe} size="2x" className="text-teal-800 mb-4" />
          <h3 className="text-xl sm:text-2xl font-semibold text-teal-800 mb-3">Global Impact</h3>
          <p className="text-sm sm:text-md text-gray-700 leading-7">
            Our goal is to cultivate global citizens who are well-prepared to make meaningful contributions and tackle challenges worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}
