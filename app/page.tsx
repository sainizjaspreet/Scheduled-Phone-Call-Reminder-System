import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full bg-white shadow-sm py-6 px-4 sm:px-8 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <Image src="/next.svg" alt="Next.js logo" width={40} height={40} />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Scheduled Phone Call Reminder System
          </h1>
        </div>
        <p className="mt-2 text-gray-600 text-center max-w-2xl">
          Automate your important reminders with scheduled phone calls, retry
          logic, backup escalation, and real-time status tracking. Built with
          Next.js, Prisma, and Twilio.
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-xl w-full flex flex-col items-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 text-center">
            Never miss an important task again
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-base mb-6 text-left w-full max-w-md mx-auto space-y-2">
            <li>
              Schedule automated phone call reminders for yourself or others
            </li>
            <li>Retry and escalation to backup contacts if not answered</li>
            <li>Real-time dashboard to manage and track reminders</li>
            <li>Interactive voice response for confirmation or snooze</li>
            <li>Built with privacy and reliability in mind</li>
          </ul>
          <Link
            href="/dashboard"
            className="w-full py-3 px-6 rounded-md bg-blue-600 text-white font-medium text-lg text-center hover:bg-blue-700 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Go to Dashboard
          </Link>
        </div>
      </main>

      <footer className="w-full bg-white border-t py-6 px-4 flex flex-col items-center mt-8">
        <p className="text-gray-700 text-sm mb-2">
          This web page is created by{" "}
          <span className="font-semibold">Jaspreet Singh Saini</span>.
        </p>
        <p className="text-gray-500 text-xs max-w-2xl text-center">
          Scheduled Phone Call Reminder System is a full-stack web application
          that lets you schedule automated phone call reminders with retry
          attempts, backup contact escalation, and real-time status tracking. It
          features a modern dashboard for managing reminders, Twilio-powered
          voice calls with interactive response, and robust backend logic for
          reliability and concurrency safety.
        </p>
      </footer>
    </div>
  );
}
