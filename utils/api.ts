const createURL = (path:any) => {
  return window.location.origin + path
}
export const updateEntry = async (id:any, content:any) => {
  const res = await fetch(new Request(createURL(`/api/journal/${id}`), {
    method: 'PATCH',
    body: JSON.stringify({ content })
  }))
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
  
}
export const createNewEntry = async () => {
  const res = await fetch(new Request(createURL('/api/journal'), {
    method: 'POST',
    // body:JSON.stringify({})
  }))
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
export const askQuestion = async (question : any)=>{
  const res = await fetch(
    new Request(createURL('/api/question'),{
      method:'POST',
      body:JSON.stringify({question})
    })
  )
  if(res.ok){
    const data = await res.json()
    console.log("data",data);
    return data.data
  }
}