"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function App() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-6">
          <Link href="/attendance">
            <div className="bg-green-100 shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 text-3xl mb-4"
              />
              <h2 className="text-2xl mb-2 font-mono text-gray-700">
                Attendance
              </h2>
            </div>
          </Link>
          <Link href="/ce">
            <div className="bg-pink-100 shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform">
              <FontAwesomeIcon
                icon={faStar}
                className="text-pink-500 text-3xl mb-4"
              />
              <h2 className="text-2xl mb-2 font-mono text-gray-700">
                Gracemark
              </h2>
            </div>
          </Link>
          {/*       
          <Link href="#">
            <div className="bg-yellow-100 shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform">
              <FontAwesomeIcon icon={faEnvelope} className="text-yellow-500 text-3xl mb-4" />
              <h2 className="text-2xl mb-2 font-mono text-gray-700">
                Communication
              </h2>
              <p className="font-serif text-gray-600">
                Send announcements, messages, and emails to students and parents.
              </p>
            </div>
          </Link>
          <Link href="#">
            <div className="bg-purple-100 shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform">
              <FontAwesomeIcon icon={faBook} className="text-purple-500 text-3xl mb-4" />
              <h2 className="text-2xl mb-2 font-mono text-gray-700">
                Lesson Plans
              </h2>
              <p className="font-serif text-gray-600">
                Create, manage, and share lesson plans with students and colleagues.
              </p>
            </div>
          </Link>
          <Link href="#">
            <div className="bg-teal-100 shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform">
              <FontAwesomeIcon icon={faArchive} className="text-teal-500 text-3xl mb-4" />
              <h2 className="text-2xl mb-2 font-mono text-gray-700">
                Resource Library
              </h2>
              <p className="font-serif text-gray-600">
                Access a collection of educational resources, teaching materials, and multimedia content.
              </p>
            </div>
          </Link>
          */}
        </div>
      </div>
    </section>
  );
}
