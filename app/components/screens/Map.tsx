"use client";

export default function Map() {
  return (
    <section className="py-8 bg-gray-200">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-center text-3xl text-[#002366] font-bold pb-10">
          Map
        </h1>
        <div className="flex justify-center items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.5076386327137!2d76.69880617342872!3d8.758239766882022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05ef7c00000001%3A0x8ac2266d9da3ee1c!2sLittle%20Flower%20English%20Medium%20Higher%20Secondary%20School!5e0!3m2!1sen!2sin!4v1708271098442!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            className="rounded-md"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
