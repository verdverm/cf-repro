'use client'

const Hack = () => {
  const onClick = () => {
    const resp = fetch("/hack")
    console.log(resp)
  }

  return (
    <button
      className="p-2 border"
      onClick={()=>onClick()}
    >
      hack
    </button>
  )

}

export default Hack