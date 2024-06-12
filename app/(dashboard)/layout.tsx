import Header from "@/components/Header"


function DashBoardLayout({ children } : any) {

  return <div className=" w-full relative">
      <Header />
      <div className="h-[calc(100vh-3.5rem)]">{children}</div>
  </div>
}

export default DashBoardLayout