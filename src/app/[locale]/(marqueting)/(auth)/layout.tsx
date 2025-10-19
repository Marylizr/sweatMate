import "../globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
   return (
     <div className="min-h-screen bg-[#0b0e13] text-slate-200">
       <div className="mx-auto flex min-h-screen max-w-xl items-center px-6">
         <div className="w-full">
           <div className="mb-8 flex items-center gap-3">
             <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 ring-1 ring-slate-700/50 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
               <span className="text-lg">🏋️‍♀️</span>
             </div>
             <div>
               <h1 className="text-xl font-semibold tracking-[-0.02em]">SweatMate</h1>
               <p className="text-xs text-slate-400 -mt-1">Your Fitness Companion</p>
             </div>
           </div>
           <div className="rounded-3xl bg-gradient-to-b from-slate-900/60 to-slate-900/30 p-6 ring-1 ring-white/5 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_20px_40px_-20px_rgba(0,0,0,0.5)]">
             {children}
           </div>
           <p className="mt-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} SweatMate</p>
         </div>
       </div>
     </div>
   );
 }
 