'use client'

import React, { useState } from 'react'
import { UserButton, SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemDecorator, Typography, Box, Button } from '@mui/joy';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import { usePathname, useRouter } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { createNewEntry } from "@/utils/api"

interface LabelInterface {
  href: string;
  label: string;
  id: number;
  Icon: React.ReactNode;
}

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const pathname = usePathname()
  const router = useRouter()

  const Links: LabelInterface[] = [
    { href: '/journal', label: "Journal", id: 1, Icon: <HomeIcon /> },
    { href: '/history', label: "History", id: 2, Icon: <HistoryIcon /> },
  ]

  const toggleDrawer = (inOpen: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(inOpen);
  };

  const handleNewEntry = async () => {
    setIsCreating(true)
    try {
      const data = await createNewEntry()
      router.push(`/journal/${data.id}`)
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        size="sm"
      >
        <Box sx={{ 
          p: 3, 
          height: '100%', 
          bgcolor: 'background.surface',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ mb: 4 }}>
            <Typography level="h4" fontWeight="xl" sx={{ mb: 3, color: 'primary.solidBg', letterSpacing: '1px' }}>
              PROJECT MOOD
            </Typography>

            <Button
              variant="solid"
              color="primary"
              startDecorator={isCreating ? null : <AddIcon />}
              loading={isCreating}
              onClick={handleNewEntry}
              sx={{ 
                width: '100%', 
                borderRadius: 'xl',
                py: 1.5,
                boxShadow: 'sm'
              }}
            >
              New Journal Entry
            </Button>
          </Box>

          <Typography level="body-xs" fontWeight="bold" sx={{ color: 'text.tertiary', mb: 1, px: 1, textTransform: 'uppercase' }}>
            Main Menu
          </Typography>

          <List size="lg" sx={{ gap: 0.5, mb: 'auto' }}>
            {Links.map((link) => (
              <ListItem key={link.id}>
                <Link href={link.href} className="w-full" onClick={() => setOpen(false)}>
                  <ListItemButton
                    selected={pathname === link.href}
                    sx={{
                      borderRadius: 'lg',
                      transition: 'all 0.2s',
                      '&.Mui-selected': {
                        bgcolor: 'primary.lightBg',
                        color: 'primary.solidBg',
                        fontWeight: 'bold',
                      },
                      '&:hover': {
                        bgcolor: pathname === link.href ? 'primary.lightBg' : 'neutral.lightBg',
                      }
                    }}
                  >
                    <ListItemDecorator sx={{ color: pathname === link.href ? 'primary.solidBg' : 'inherit' }}>
                      {link.Icon}
                    </ListItemDecorator>
                    {link.label}
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <SignOutButton>
              <ListItemButton sx={{ borderRadius: 'lg', color: 'danger.plainColor' }}>
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <LogoutIcon />
                </ListItemDecorator>
                Sign Out
              </ListItemButton>
            </SignOutButton>
          </Box>
        </Box>
      </Drawer>

      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <IconButton
            variant="plain"
            color="neutral"
            onClick={toggleDrawer(true)}
            sx={{ 
              borderRadius: 'lg',
              '&:hover': { bgcolor: 'slate.50' }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography level="h4" fontWeight="xl" sx={{ color: 'primary.solidBg', display: { xs: 'none', sm: 'block' } }}>
            Project Mood
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
    </>
  )
}

export default Header