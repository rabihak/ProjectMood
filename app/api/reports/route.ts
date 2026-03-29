import { generateReport } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"
import { subDays } from "date-fns"

export const GET = async () => {
  try {
    const user = await getUserByClerkId()
    const thirtyDaysAgo = subDays(new Date(), 30)

    const analyses = await prisma.analysis.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    if (analyses.length === 0) {
      return NextResponse.json({ data: null, message: "Not enough data to generate a report yet. Keep journaling!" })
    }

    // Limit to last 60 analyses to avoid context window issues
    const limitedAnalyses = analyses.slice(-60)

    console.log(`Generating report for user ${user.id} with ${limitedAnalyses.length} analyses`)
    const report = await generateReport(limitedAnalyses)

    if (!report) {
      console.error("Report generation returned null")
      return NextResponse.json({ error: "Failed to parse wellness report" }, { status: 500 })
    }

    return NextResponse.json({ data: report })
  } catch (error: any) {
    console.error("Report API error:", error)
    return NextResponse.json({ error: `Failed to generate report: ${error.message}` }, { status: 500 })
  }
}