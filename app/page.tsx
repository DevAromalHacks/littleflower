"use client";

import CustomHeader from "./components/includes/CustomHeader";
import Hero from "./components/screens/Hero";
import About from "./components/screens/About";
import Founder from "./components/screens/Founder";
import Mission from "./components/screens/Mission";
import Achievements from "./components/screens/Achivements";
import Specialites from "./components/screens/Speciality";
import Testimonial from "./components/screens/Testimonial";
import Map from "./components/screens/Map";
import Contact from "./components/screens/Contact";
import Footer from "./components/screens/Footer";
import AdmissionPopUp from "./components/includes/PopUp";
import { useEffect, useState } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import SideBanner from "./components/includes/SideBanner";


export default function LandingPage() {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main>
      <CustomHeader />
      <Hero />
      <About />
      <Founder />
      <Mission />
      <Achievements />
      <Specialites />
      <Testimonial />
      <Map />
      <Contact />
      <Footer />
      <SideBanner />
      <FloatingWhatsApp
          phoneNumber="+918086023123"
          accountName="Gem Know Model HSS"
          darkMode={true}
          notificationSound={true}
          allowClickAway={false}
          chatboxHeight={450}
          notification={true}
          className="text-black"
          avatar="/logo-roundco.avif"
        />
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <AdmissionPopUp closeModal={closeModal} />
        </div>
      )}
    </main>
  );
}
