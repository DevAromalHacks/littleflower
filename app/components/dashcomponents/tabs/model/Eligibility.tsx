import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";

export default function Eligibility() {
  return (
    <section>
      <div className="bg-white rounded-lg w-full h-full px-10 py-10 text-center">
        <FontAwesomeIcon
          icon={faFaceFrown} 
          className="pt-1 w-20 h-20 text-yellow-500" 
        />
        <h2 className="text-center text-xl mt-4">
          Oops! You are not eligible for collecting the hall ticket. <br />
          Contact your class teacher for more details.
        </h2>
      </div>
    </section>
  );
}
