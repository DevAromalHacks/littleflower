interface TicketProps {
  ticketData: {
    name: string;
    admission_no: number;
    class: number;
    div: string;
  };
}

export default function Tickets({ ticketData }: TicketProps) {
  const examSchedules: { [key: number]: { date: string; subject: string }[] } =
    {
      5: [
        { date: "14/12/2024 | 09:00 AM", subject: "Math" },
        { date: "15/12/2024 | 09:00 AM", subject: "Science" },
        { date: "16/12/2024 | 09:00 AM", subject: "English" },
      ],
      6: [
        { date: "14/12/2024 | 10:00 AM", subject: "Social Science" },
        { date: "15/12/2024 | 10:00 AM", subject: "Math" },
        { date: "16/12/2024 | 10:00 AM", subject: "English" },
      ],
      7: [
        { date: "14/12/2024 | 11:00 AM", subject: "Math" },
        { date: "15/12/2024 | 11:00 AM", subject: "Physics" },
        { date: "16/12/2024 | 11:00 AM", subject: "English" },
      ],
      8: [
        { date: "14/12/2024 | 12:00 PM", subject: "Chemistry" },
        { date: "15/12/2024 | 12:00 PM", subject: "Biology" },
        { date: "16/12/2024 | 12:00 PM", subject: "Math" },
      ],
      9: [
        { date: "14/12/2024 | 01:00 PM", subject: "History" },
        { date: "15/12/2024 | 01:00 PM", subject: "Geography" },
        { date: "16/12/2024 | 01:00 PM", subject: "Math" },
      ],
      10: [
        { date: "14/12/2024 | 02:00 PM", subject: "Physics" },
        { date: "15/12/2024 | 02:00 PM", subject: "Math" },
        { date: "16/12/2024 | 02:00 PM", subject: "English" },
      ],
      11: [
        { date: "14/12/2024 | 03:00 PM", subject: "Chemistry" },
        { date: "15/12/2024 | 03:00 PM", subject: "Biology" },
        { date: "16/12/2024 | 03:00 PM", subject: "Math" },
      ],
      12: [
        { date: "14/12/2024 | 04:00 PM", subject: "Math" },
        { date: "15/12/2024 | 04:00 PM", subject: "English" },
        { date: "16/12/2024 | 04:00 PM", subject: "Physics" },
      ],
    };
  const classSchedule = examSchedules[ticketData.class];
  const print = () => {
    window.print();
  };
  return (
    <section className="flex items-center justify-center text-black">
      <div className="w-[800px] h-[500px] overflow-y-auto bg-white shadow-lg rounded-lg print:w-full print:h-auto print:overflow-visible print:shadow-none print:bg-white">
        <div className="pb-4 pt-6">
          <h1 className="text-center font-semibold text-3xl">
            Little Flower EM HSS Edava
          </h1>
          <h2 className="text-center text-2xl">
            First Term Evaluation - December 2024 <br />
            Admission Ticket
          </h2>
        </div>
        <div className="px-10 pb-6">
          <h2 className="font-bold">Name of Student : {ticketData.name}</h2>
          <h2 className="font-bold">
            Admission Number : {ticketData.admission_no}
          </h2>
          <h2 className="font-bold">Class : {ticketData.class}</h2>
          <h2 className="font-bold">Division : {ticketData.div}</h2>
        </div>
        <div className="pb-6">
          <h2 className="text-center text-2xl font-bold pb-2">
            Subject for which the student appears
          </h2>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              <table className="table-auto border-collapse border-2 border-stone-800 text-left">
                <thead>
                  <tr>
                    <th className="border-2 border-stone-800 text-center px-4 py-2 w-80">
                      Date and Time
                    </th>
                    <th className="border-2 border-stone-800 px-4 py-2 text-center w-40">
                      Subject
                    </th>
                    <th className="border-2 border-stone-800 text-center px-4 py-2">
                      Name & Signature of Invigilator
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classSchedule.map((exam, index) => (
                    <tr key={index}>
                      <td className="border-2 border-stone-800 text-center px-4 py-2">
                        {exam.date}
                      </td>
                      <td className="border-2 border-stone-800 text-center px-4 py-2">
                        {exam.subject}
                      </td>
                      <td className="border-2 border-stone-800 text-center px-4 py-2"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 pb-2">
          <h2 className="text-xl">Signature of student: </h2>
          <div className="w-80 h-16 rounded-md border-2 border-stone-800"></div>
        </div>
        <div className="pb-10">
          <h2 className="text-center text-2xl font-bold pb-4">
            <u>General Instructions to students</u>
          </h2>
          <div className="pb-4 px-10">
            <ul className="list-disc list-inside">
              <li>
                Be in proper uniform. If not, get class teacher's letter of
                permission.
              </li>
              <li>
                Be punctual. Late entry permitted only till the first 10
                minutes.
              </li>
              <li>
                Do not bring mobile phones / smart watches, as they will be
                confiscated.
              </li>
              <li>
                Keep your Admission ticket on the table. Get permission from the
                class teacher, if not in possession.
              </li>
              <li>
                Carry all required stationery (except writing paper) of your
                own.
              </li>
              <li>All pages should be properly numbered.</li>
              <li>Malpractices will be dealt with strictly.</li>
              <li>Do not leave the exam hall before the scheduled end time.</li>
            </ul>
          </div>
          <div className="flex items-center justify-center gap-[488px]">
            <div className="px-10">
              <h2>Edava</h2>
              <h2>02.09.2024</h2>
            </div>
            <div className="px-10">
              <h2>Principal</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
