import Link from "next/link";

export default function SideBanner() {

  const newYear = new Date().getFullYear()
  const nextYear = newYear + 1
  const nextYearFirstTwo = nextYear.toString().slice(-2)

  return (
    <Link href="/academics/admission-enrollment">
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-cyan-700 text-white font-semibold w-10 h-44 flex items-center justify-center hover:bg-gradient-to-tr hover:from-cyan-800 hover:to-sky-800">
        <span className="transform -rotate-90 origin-center whitespace-nowrap">
          Admission {newYear}-{nextYearFirstTwo}
        </span>
      </div>
    </Link>
  );
}
