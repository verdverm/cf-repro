'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <div className="py-24 flex flex-1 flex-col w-full items-center gap-8 space-x-8">

        <span className="font-light text-gray-600 italic text-3xl pt-4">
          An error occurred :[
        </span>

        <button
          className="border rounded-md p-2"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  )
}