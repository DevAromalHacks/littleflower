import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketSimple } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Eligibility() {
  return (
    <section>
      <div className="bg-slate-800 rounded-lg w-full h-full px-10 py-10 text-center">
        <FontAwesomeIcon
          icon={faTicketSimple} 
          className="pt-1 w-20 h-20 text-green-500" 
        />
        <h2 className="text-center text-white text-xl mt-4">
            You are not eligible for collecting the hall ticket. <br /> <Link href="/hallticket" className="text-blue-600">Click here </Link>to download your hallticket
        </h2>
      </div>
    </section>
  );
}
