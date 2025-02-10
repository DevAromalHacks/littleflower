import Link from "next/link";

export default function ReverseScroller(){
    return(
        <Link href="" className="absolute right-0 bottom-0">
            <div className="w-10 h-10 bg-yellow-500 rounded-full">
                <p>.</p>
            </div>
        </Link>
    )
}