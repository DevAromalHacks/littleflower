import Image from "next/image";

export default function About() {
  return (
    <section className="">
      <div>
        <div
          style={{
            backgroundImage: "url('/images/school_auto_x2.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="w-full"
        ></div>

        <h1 className="text-center text-4xl font-bold text-orange py-10">
          About Us
        </h1>
        <div className="flex flex-wrap items-center py-10 justify-center">
          <div>
            <Image
              src="/images/school.jpg"
              alt="logo"
              width={600}
              height={600}
              className="rounded-2xl hidden lg:block"
            />
            <Image
              src="/images/school.jpg"
              alt="logo"
              width={640}
              height={640}
              className="rounded-2xl p-4 block lg:hidden"
            />
          </div>
          <div>
            <p className="max-w-screen-sm text-justify p-10 text-white">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda quisquam qui repellendus sit. Nam repudiandae cupiditate
              eius ipsam quos mollitia ad porro quaerat ex eligendi! Voluptatum
              doloremque aliquam facilis! Animi modi non adipisci minima.
              Numquam blanditiis officia provident omnis nesciunt similique
              perspiciatis pariatur consequuntur, dolore laborum at possimus
              ratione aut ex nihil iste, minus voluptas unde corrupti illo.
              Obcaecati ut, quam similique repellat officiis, corporis esse
              dolorem blanditiis eaque ea soluta odio in. Molestias, minus?
              Facilis dolores nam molestias aspernatur nostrum voluptatum vel
              at! Dolorem nihil molestias neque earum et expedita beatae Facilis
              dolores nam molestias aspernatur nostrum voluptatum vel at!
              Dolorem nihil molestias neque earum et expedita beatae mollitia.
              Nesciunt iusto quod iure exercitationem, saepe dolorem, mollitia.
              Nesciunt iusto quod iure exercitationem, saepe dolorem,
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center py-10 justify-center">
          <div>
            <p className="max-w-screen-sm text-justify p-10 text-white hidden md:hidden sm:hidden 3xl:hidden lg:block">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda quisquam qui repellendus sit. Nam repudiandae cupiditate
              eius ipsam quos mollitia ad porro quaerat ex eligendi! Voluptatum
              doloremque aliquam facilis! Animi modi non adipisci minima.
              Numquam blanditiis officia provident omnis nesciunt similique
              perspiciatis pariatur consequuntur, dolore laborum at possimus
              ratione aut ex nihil iste, minus voluptas unde corrupti illo.
              Obcaecati ut, quam similique repellat officiis, corporis esse
              dolorem blanditiis eaque ea soluta odio in. Molestias, minus?
              Facilis dolores nam molestias aspernatur nostrum voluptatum vel
              at! Dolorem nihil molestias neque earum et expedita beatae Facilis
              dolores nam molestias aspernatur nostrum voluptatum vel at!
              Dolorem nihil molestias neque earum et expedita beatae mollitia.
              Nesciunt iusto quod iure exercitationem, saepe dolorem, mollitia.
              Nesciunt iusto quod iure exercitationem, saepe dolorem,
            </p>
          </div>
          <div>
            <Image
              src="/images/school.jpg"
              alt="logo"
              width={600}
              height={600}
              className="rounded-2xl hidden lg:block"
            />
            <Image
              src="/images/school.jpg"
              alt="logo"
              width={640}
              height={640}
              className="rounded-2xl p-4 block lg:hidden"
            />
          </div>
          <div>
            <p className="max-w-screen-sm text-justify p-10 text-white block md:block lg:hidden">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda quisquam qui repellendus sit. Nam repudiandae cupiditate
              eius ipsam quos mollitia ad porro quaerat ex eligendi! Voluptatum
              doloremque aliquam facilis! Animi modi non adipisci minima.
              Numquam blanditiis officia provident omnis nesciunt similique
              perspiciatis pariatur consequuntur, dolore laborum at possimus
              ratione aut ex nihil iste, minus voluptas unde corrupti illo.
              Obcaecati ut, quam similique repellat officiis, corporis esse
              dolorem blanditiis eaque ea soluta odio in. Molestias, minus?
              Facilis dolores nam molestias aspernatur nostrum voluptatum vel
              at! Dolorem nihil molestias neque earum et expedita beatae Facilis
              dolores nam molestias aspernatur nostrum voluptatum vel at!
              Dolorem nihil molestias neque earum et expedita beatae mollitia.
              Nesciunt iusto quod iure exercitationem, saepe dolorem, mollitia.
              Nesciunt iusto quod iure exercitationem, saepe dolorem,
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-center text-3xl lg:text-4xl font-bold text-orange py-10 pb-10">
            Our Commeration
          </h1>
          <div className="flex items-center gap-30 lg:20 md:gap-20 justify-center">
            <div>
              {" "}
              <Image
                src="/images/kuttan.jpg"
                alt="logo"
                width={300}
                height={300}
                className="rounded-full p-4 hidden lg:block"
              />
              <Image
                src="/images/kuttan.jpg"
                alt="logo"
                width={160}
                height={160}
                className="rounded-full p-4 block lg:hidden"
              />
              <div>
                <h1 className="text-center text-xl md:text-2xl lg:text-3xl">
                  Sri. kuttan sir
                </h1>
              </div>
            </div>
            <div>
              {" "}
              <Image
                src="/images/latha.jpg"
                alt="logo"
                width={300}
                height={300}
                className="rounded-full p-4 hidden lg:block"
              />
              <Image
                src="/images/latha.jpg"
                alt="logo"
                width={160}
                height={160}
                className="rounded-full p-4 block lg:hidden"
              />
              <div>
                <h1 className="text-center text-xl md:text-2xl lg:text-3xl">
                  Sri. latha teacher
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
