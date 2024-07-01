export default function Calendar(){
    return(
        <section>
           <div className="p-6">
            <h2 className="text-3xl mb-4">Calendar</h2>
            <div className="bg-white shadow-lg rounded p-4 mb-4">
              <h3 className="text-xl mb-2">May 22, 2024</h3>
              <ul className="font-serif">
                <li>Math Test - 10:00 AM</li>
                <li>Science Project Due - 3:00 PM</li>
              </ul>
            </div>
            <div className="bg-white shadow-lg rounded p-4 mb-4">
              <h3 className="text-xl mb-2">May 20, 2024</h3>
              <ul className="font-serif">
                <li>Science Fair - 9:00 AM</li>
                <li>Parent-Teacher Meeting - 1:00 PM</li>
              </ul>
            </div>
            <div className="bg-white shadow-lg rounded p-4 mb-4">
              <h3 className="text-xl mb-2">May 18, 2024</h3>
              <ul className="font-serif">
                <li>Field Trip - 8:00 AM</li>
                <li>Math Homework Due - 11:59 PM</li>
              </ul>
            </div>
            <div className="bg-white shadow-lg rounded p-4 mb-4">
              <h3 className="text-xl mb-2">May 15, 2024</h3>
              <ul className="font-serif">
                <li>History Quiz - 10:00 AM</li>
                <li>English Essay Due - 3:00 PM</li>
              </ul>
            </div>
          </div>
        </section>
    );
}