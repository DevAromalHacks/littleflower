"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "./components/includes/Navbar";
import Hero from "./components/screens/Hero";
import Welcome from "./components/screens/Welcome";
import Whyus from "./components/screens/Whyus";
import Levels from "./components/screens/Levels";
import Speciality from "./components/screens/Speciality";
import Achivements from "./components/screens/Achivements";
import Map from "./components/screens/Map";
import Testimonial from "./components/screens/Testimonial";
import Footer from "./components/screens/Footer";
import Contact from "./components/screens/Contact";

export default function Page() {
  // const router = useRouter();

  // useEffect(() => {
  //   const userEmail = localStorage.getItem('userEmail');
  //   if (userEmail) {
  //     router.push('/dashboard/dash/dashboard');
  //   }
  // }, [router]);

  return (
    <div>
      <Nav />
      <Hero />
      <Welcome />
      <Whyus />
      <Levels />
      <Speciality />
      <Testimonial />
      <Contact />
      <Map />
      <Footer />
    </div>
  );
}
