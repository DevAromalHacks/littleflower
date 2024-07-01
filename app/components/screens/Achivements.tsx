import Image from "next/image";

export default function Achivements() {
  return (
    <section className="achivements">
      <div className="card-wrapper">
        <div className="card-container">
          <h1 className="text-center text-3xl font-bold text-orange py-20 text-shadow-orange">
            Our Achievement{" "}
          </h1>
          <div className="photo_array">
            <div>
              <Image
                src="/images/sports1.jpg"
                alt="achivements"
                width={700}
                height={700}
              />
            </div>
            <div>
              <Image
                src="/images/sports1.jpg"
                alt="achivements"
                width={700}
                height={700}
              />
            </div>
            <div>
              <Image
                src="/images/sports1.jpg"
                alt="achivements"
                width={700}
                height={700}
              />
            </div>
            <div>
              <Image
                src="/images/sports1.jpg"
                alt="achivements"
                width={700}
                height={700}
              />
            </div>
            <div>
              <Image
                src="/images/sports1.jpg"
                alt="achivements"
                width={700}
                height={700}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
