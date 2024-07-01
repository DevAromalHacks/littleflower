import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faVideo, faQuestionCircle, faLaptopCode, faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

export default function OnlineEvent() {
  const quickLinks = [
    {
      title: "Online Quiz",
      description: "Participate in our latest quizzes.",
      icon: faQuestionCircle,
      bgColor: "bg-blue-500",
    },
    {
      title: "Webinars",
      description: "Join live webinars with industry experts.",
      icon: faVideo,
      bgColor: "bg-green-500",
    },
    {
      title: "Coding Challenges",
      description: "Test your coding skills.",
      icon: faLaptopCode,
      bgColor: "bg-purple-500",
    },
    {
      title: "Workshops",
      description: "Participate in interactive workshops.",
      icon: faChalkboardTeacher,
      bgColor: "bg-yellow-500",
    },
  ];

  return (
    <section>
      <div className="mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">Online Events</h1>
          <p className="text-xl text-white">
            Engage with various online activities and enhance your skills.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg ${link.bgColor} hover:shadow-2xl transition-shadow duration-300`}
            >
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={link.icon} className="text-white text-3xl mr-4" />
                <div>
                  <h2 className="text-2xl font-semibold">{link.title}</h2>
                </div>
              </div>
              <p className="text-white">{link.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
