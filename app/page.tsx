import Link from "next/link";
import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId }: { userId: string | null } = await auth();
  
  if (userId) {
    redirect("/journal")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-8" >
      <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Understand your <span className="text-primary">Project Mood</span>.
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
            The intelligent journaling companion that uses AI to analyze your thoughts 
            and help you discover patterns in your emotional well-being.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <Link href="/new-user" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-xl shadow-slate-200">
              Get Started for Free
            </button>
          </Link>
          <Link href="/sign-in" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-50 transition-all border border-slate-200">
              Sign In
            </button>
          </Link>
        </div>

        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-left px-4">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:border-primary/20">
            <h3 className="font-bold text-slate-900 mb-2">AI Analysis</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Get instant insights into the sentiment and mood of your journal entries.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:border-primary/20">
            <h3 className="font-bold text-slate-900 mb-2">Track Trends</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Visualize your emotional journey with interactive history charts.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:border-primary/20">
            <h3 className="font-bold text-slate-900 mb-2">Secure & Private</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Your thoughts are private and securely stored, accessible only by you.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
