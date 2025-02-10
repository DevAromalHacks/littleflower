import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface AdmissionPopUpProps {
  closeModal: () => void;
}

export default function AdmissionPopUp({ closeModal }: AdmissionPopUpProps) {
  return (
    <section className="flex justify-center items-center h-screen relative top-10">
      <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>
        <h1 className="text-2xl font-bold text-teal-700 mb-4">
          Admission Started!
        </h1>
        <Image
          src="/images/school_mod.jpg"
          alt="Admission Started Banner"
          className="w-full h-auto rounded-md mb-4"
          width={500}
          height={500}
        />
        <p className="text-gray-700 mb-4">
          Enroll your child today for a bright future! Limited seats are
          available.
        </p>
        <Link href="/academics/admission-enrollment">
          <button className="bg-yellow-500 hover:bg-amber-600 text-white font-semibold py-2 px-4  transition-all">
            Apply Now
          </button>
        </Link>
      </div>
    </section>
  );
}
