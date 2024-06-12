'use client'
import { AnyPtrRecord } from 'dns'
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip, YAxis } from 'recharts'

const CustomTooltip = ({ payload, label, active } :any) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (active) {
    const analysis = payload[0].payload
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
    )
  }

  return null
}

const HistoryChart = ({ data }:any) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className='pl-[-10px] bg-slate-400'>
      <LineChart width={300} height={100} data={data} >
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="updatedAt" />
        <YAxis dataKey="sentimentScore" fontSize={"12px"} padding={{top:10,bottom:10}} />

        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart