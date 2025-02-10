import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faDiscord,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
// import ReverseScroller from "../includes/ReverseScroller";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tr via-teal-900 from-cyan-800 to-indigo-800 text-white py-8">
      {/* <ReverseScroller /> */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 px-10">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <ul className="flex justify-center space-x-4">
            <li>
              <Link href="#">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="w-8 h-8 hover:text-red-700 transition duration-300"
                />
              </Link>
            </li>
            <li>
              <Link href="#">
                <FontAwesomeIcon
                  icon={faDiscord}
                  className="w-8 h-8 hover:text-blue-400 transition duration-300"
                />
              </Link>
            </li>
            <li>
              <Link href="#">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="w-8 h-8 hover:text-pink-500 transition duration-300"
                />
              </Link>
            </li>
            <li>
              <Link href="#">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="w-8 h-8 hover:text-blue-500 transition duration-300"
                />
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 text-center md:text-right">
          <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
          <div className="space-y-2">
            <p>Little Flower, Edava, <br /> Thiruvananthapuram, Kerala 695311</p>
            <p><a href="mailto:littlefloweredava@gmail.com">littlefloweredava@gmail.com</a></p>
            <p><a href="tel:9895133248">9895133248</a></p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-4 text-center">
        <p>
          Created and developed by{" "}
          <span className="text-sky-300">
            <Link href="" target="_blank">
              developer Aromal &nbsp;
            </Link>
          </span>All Rights Reserved &copy;
        </p>
      </div>
    </footer>
  );
}
