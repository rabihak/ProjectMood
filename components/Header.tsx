'use client'

import React, { useState } from 'react'
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import { SvgIconProps,  } from '@mui/joy';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { usePathname } from 'next/navigation'

interface LabelInterface {
  href: string;
  label: string;
  id:number;
  Icon: React.ReactElement<SvgIconProps>;
}
const Header = () => {
  const Links : LabelInterface[]  =[
    {href:'/journal',label:"Journal",id:1,Icon:<HomeIcon fontSize='large' className='pb-1'/>},
    {href:'/history',label:"History Overview",id:2,Icon:<HistoryIcon fontSize='large'className='pb-1'/>},
  ]

  const [open, setOpen] = useState(false);
  const toggleDrawer = (inOpen: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(inOpen);
  };
  const pathname = usePathname()

  return (
    <>
      <Drawer
        anchor="left"
        color="primary"
        size="sm"
        variant="plain"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <div className='rounded-r-md text-black w-full h-full'>
        <div className=" pt-8 px-4 ">
        <h1 className='text-2xl font-bold pl-5'>{`MOOD`}</h1>
        <hr className=' w-[100%] mt-2  h-[1.5px] bg-black px-4'/>
        </div>
        <div className="py-2 px-4">
          <ul>
          {Links.map(link=>(
          <li className={`text-xl my-2 py-2 pl-1 hover:cursor-pointer ${pathname ===link.href?"bg-[#96D9F7] text-black rounded-lg" :''} `} key={link.label} >
            <Link href={link.href} onClick={toggleDrawer(false)} >
              {link.Icon} {link.label}
            </Link>
          </li>
        ))}
          </ul>
        </div>
        </div>
      </Drawer>
      <header className="flex h-14 border-b border-black/10 ">
        <div className="h-full w-1/2 px-4 flex items-center justify-start">
          <Button
            variant="plain" className='text-black' color='neutral' onClick={toggleDrawer(true)}>
            <MenuIcon fontSize="medium" onClick={toggleDrawer(true)} />
          </Button>
        </div>
        <div className="h-full w-1/2 px-6 hover:cursor-pointer flex items-center justify-end">
          <UserButton />
        </div>
      </header>
    </>
  )
}

export default Header