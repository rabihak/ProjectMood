import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

function DashBoardLayout({ children }) {
  const links =[
    {href:'/',label:"Home",id:1},
    {href:'/journal',label:"Journal",id:2},

  ]
  return <div className=" w-full relative">
    <aside className="absolute w-[200px]   border-r text-2xl border-black/10">
      <div className="top-2 left-4 py-6">
        Project Mood
      </div>
      <ul>
        {links.map(link=>(
          <li className="py-6 text-xl top-2 left-4" key={link.label}>
            <Link href={link.href} >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
    <div className="ml-[200px]">
      <header className="h-[60px] border-b border-black/10 ">
        <div className="h-full w-full px-6 flex items-center justify-end">
          <UserButton />
        </div>
      </header>
      <div className="h-[calc(100vh-70px)]">{children}</div>
    </div>
  </div>
}

export default DashBoardLayout