import { EntryCardContainer } from "@/components/EntryCardContainer"
import Question from "@/components/Question"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import EntryCard from "@/components/EntryCard"
import Link from "next/link"
import NewEntryCard from "@/components/NewEntryCard"

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      analysis: true,
    }
  })
  return entries
}

const JournalPage = async () => {
  const user = await getUserByClerkId()
  const entries = await getEntries()
  
  const latestEntry = entries[0]
  const otherEntries = entries.slice(1)

  return (
    <Box sx={{ p: { xs: 3, md: 6 }, bgcolor: 'neutral.lightBg', minHeight: '100%' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Box sx={{ mb: 8, display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, alignItems: 'stretch' }}>
          <Box sx={{ flex: 1.5, display: 'flex', flexDirection: 'column' }}>
            <Typography level="h1" fontWeight="xl" sx={{ mb: 1, color: 'primary.solidBg', fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              Welcome, {user.firstName}
            </Typography>
            <Typography level="body-xl" sx={{ color: 'text.secondary', mb: 4, maxWidth: '500px' }}>
              Your mental well-being matters. Document your thoughts and let AI help you find patterns.
            </Typography>
            
            <Card 
              variant="soft" 
              sx={{ 
                p: 3, 
                borderRadius: '2xl',
                boxShadow: 'md',
                bgcolor: 'background.surface',
                mt: 'auto'
              }}
            >
              <Typography level="title-lg" sx={{ mb: 2, fontWeight: 'bold' }}>
                Ask your Journal
              </Typography>
              <Question />
            </Card>
          </Box>
          
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography level="h4" fontWeight="bold" sx={{ mb: 2, color: 'primary.solidBg' }}>
                Quick Actions
              </Typography>
              <NewEntryCard />
            </Box>

            {latestEntry && (
              <Box>
                <Typography level="h4" fontWeight="bold" sx={{ mb: 2, color: 'primary.solidBg' }}>
                  Latest Entry
                </Typography>
                <Link href={`/journal/${latestEntry.id}`}>
                  <Box sx={{ 
                    transition: 'transform 0.2s', 
                    '&:hover': { transform: 'scale(1.02)' }
                  }}>
                    <EntryCard entry={latestEntry} />
                  </Box>
                </Link>
              </Box>
            )}
          </Box>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography level="h4" fontWeight="bold" sx={{ color: 'primary.solidBg' }}>
              Previous Reflections
            </Typography>
            <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'} total
            </Typography>
          </Box>
          
          {otherEntries.length === 0 && !latestEntry ? (
            <Card variant="dashed" sx={{ py: 8, textAlign: 'center', bgcolor: 'transparent' }}>
              <Typography level="title-lg" sx={{ mb: 1 }}>No entries yet</Typography>
              <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                Start your journey by creating a new entry above.
              </Typography>
            </Card>
          ) : (
            <EntryCardContainer entries={otherEntries} />
          )}
        </Box>
      </Box>
    </Box>
  )
}
export default JournalPage