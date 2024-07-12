import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faDiscord,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <ul className="flex justify-center space-x-4">
            <li>
              <Link href="https://www.youtube.com">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="w-8 h-8 hover:text-red-700 transition duration-300"
                />
              </Link>
            </li>
            <li>
              <Link href="https://discord.com">
                <FontAwesomeIcon
                  icon={faDiscord}
                  className="w-8 h-8 hover:text-blue-400 transition duration-300"
                />
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com/lfem_hss/">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="w-8 h-8 hover:text-pink-500 transition duration-300"
                />
              </Link>
            </li>
            <li>
              <Link href="https://www.facebook.com/people/Little-Flower-English-Medium-Higher-Secondary-School-Edava-Official/100057068126083/">
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
            <p>info@example.com</p>
            <p>123-456-7890</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-4 text-center">
        <p>
          Created and developed by{" "}
          <span className="text-purple-500">
            <Link href="https://devaromal.vercel.app" target="_blank">
              developer Aromal
            </Link>
          </span>{" "}
          All Rights Reserved &copy;
        </p>
      </div>
    </footer>
  );
}