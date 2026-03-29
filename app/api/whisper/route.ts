import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as Blob

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
    }

    const openRouterFormData = new FormData()
    openRouterFormData.append('file', file, 'audio.webm')
    openRouterFormData.append('model', 'openai/whisper-1')

    const response = await fetch("https://openrouter.ai/api/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: openRouterFormData
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("OpenRouter Whisper Error:", errorData)
      return NextResponse.json({ error: "Transcription failed" }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json({ text: data.text })
  } catch (error) {
    console.error("Whisper API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}