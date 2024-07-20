const EntryCard = ({ entry } :any) => {  
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="max-h-72 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5 h-20  overflow-hidden overflow-ellipsis break-words whitespace-pre ">{entry?.analysis?.summary}</div>
      <div className="px-4 py-4"> Mood: {entry?.analysis?.mood}</div>
    </div>
  )
}

export default EntryCard