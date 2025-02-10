import Image from "next/image";

export default function Achievements() {
  const achievements = [
    {
      title: "District Science Fair Winner",
      description:
        "Won first place in the annual district science fair with an innovative project on renewable energy.",
      image: "/exibition.jpg", // replace with actual image paths
      category: "Academic",
    },
    {
      title: "State-Level Football Champions",
      description:
        "Secured the championship in the state-level football tournament.",
      image: "/images/sports1.jpg",
      category: "Sports",
    },
    {
      title: "Community Service Award",
      description:
        "Recognized for our contribution to community welfare through various service initiatives.",
      image: "/award.jpg",
      category: "Community",
    },
  ];

  return (
    <section className="py-12 px-4 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-semibold text-gray-700">
          <span className="border-1 border-l-4 border-teal-800"></span>
          &nbsp;Our Achievements
        </h2>
        <h2 className="text-4xl pt-2 pb-8 text-teal-800 font-bold">
          Striving for Greatness Together
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <Image
              src={achievement.image}
              alt={achievement.title}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-teal-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-xl font-semibold text-white">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-200">{achievement.description}</p>
              <span className="absolute top-2 right-2 bg-yellow-500 text-teal-800 px-2 py-1 rounded text-xs">
                {achievement.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
