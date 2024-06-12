import Link from "next/link";
import { auth } from '@clerk/nextjs/server';
import MainIcon from "@/components/MainIcon";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId }: { userId: string | null } = await auth();
  let href = userId ? "/journal" : "/new-user"
  if (userId) {
    redirect("/journal")
  }
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center text-white" >
      <div className="w-full h-full max-w-[600px] mx-auto flex justify-center  content-center flex-col">
        <h1 className="text-3xl mb-4 center text-center">Project Mood</h1>
        <p className="text-2xl text-white/60 mb-4 text-center">AI Powered Journaling App</p>
        <div className="flex justify-center content-center">
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">get started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
