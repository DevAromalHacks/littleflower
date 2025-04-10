import Link from "next/link";

export default function Maintainance(){
    return (
        <section className="h-screen flex items-center justify-center  bg-black">
            <div className="">
                <h1 className="text-white text-3xl">We are under Maintainance, we will be back soon</h1>

                <p className="text-center text-white">Powered by <span className="text-blue-800"><Link target="blank"  href="https://www.instagram.com/__nymora__">Nymora</Link></span></p>
            </div>
        </section>
    )
}