"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "./Button";

interface NavItemProps {
  href: string;
  children: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = isMenuOpen ? "hidden" : "auto";
    }
    return () => {
      if (body) {
        body.style.overflow = "auto";
      }
    };
  }, [isMenuOpen]);

  return (
    <nav className="backdrop-blur-md backdrop-brightness-40 h-20 w-full fixed top-0 left-0 right-0 z-50 lg:flex lg:justify-between lg:items-center px-5 lg:px-20">
      <div className="flex justify-between items-center w-full">
        <Link href="/home">
          <div className="cursor-pointer">
            <div className="lg:hidden">
              <Image src="/icons/logo.png" alt="logo" width={78} height={78} />
            </div>
            <div className="hidden lg:block">
              <Image src="/icons/logo.png" alt="logo" width={78} height={78} />
            </div>
          </div>
        </Link>
        <button
          onClick={toggleMenu}
          className="lg:hidden z-50 px-3 rounded-2xl focus:outline-none"
        >
          {isMenuOpen ? (
            <FaTimes className="text-white" size={24} />
          ) : (
            <FaBars className="text-white" size={24} />
          )}
        </button>
      </div>
      <div
        className={`lg:flex lg:items-center lg:gap-10 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="hidden lg:block">
          <ul className="lg:flex lg:items-center lg:gap-10 mt-4 lg:mt-0">
            <NavItem href="/home">Home</NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/blog">Blog</NavItem>
            <NavItem href="/gallery">Gallery</NavItem>
            <NavItem href="/contact">Contact</NavItem>
            <Button
              href="/auth/login"
              title="LOGIN"
              className="bg-transparent py-2 px-10 text-lg border border-[#00AEEF] text-[#3669c8] hover:bg-[#00AEEF] hover:text-black transition duration-300"
            />
          </ul>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 w-full h-screen bg-black -z-40 flex flex-col items-center justify-center space-y-4">
          <ul className="flex flex-col items-center space-y-4">
            <NavItem href="/home">Home</NavItem>
            <NavItem href="/about">About Us</NavItem>
            <NavItem href="/blog">Blog</NavItem>
            <NavItem href="/gallery">Gallery</NavItem>
            <NavItem href="/contact">Contact</NavItem>
          </ul>
          <Button
            href="/auth/login"
            title="LOGIN"
            className="bg-transparent py-2 px-10 text-lg border border-[#00AEEF] text-[#3669c8] hover:bg-[#00AEEF] hover:text-black transition duration-300"
          />
        </div>
      )}
    </nav>
  );
}

function NavItem({ href, children }: NavItemProps) {
  return (
    <li className="text-lg text-white hover:text-[#00AEEF] cursor-pointer">
      <Link href={href}>{children}</Link>
    </li>
  );
}
