'use client'

import { useState } from "react"

import { 
  Link as Copy,
  Check,
 } from "lucide-react"

const CopyTextIcon = ({ 
  text,
  toggleMs = 1500,
  Icon1 = Copy,
  Icon2 = Check,
}:{ 
  text: string,
  toggleMs?: number,
  Icon1?: any,
  Icon2?: any,
}) => {

  const [copied, setCopied] = useState(false)

  return (
    <div
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true)
        setTimeout(() => setCopied(false), toggleMs)
      } }
    >
      { copied
        ? <Icon2 size={20} className="text-brat-green" />
        
        : <Icon1
            className="hover:cursor-pointer hover:text-bluesky-blue"
            size={20}
          />
      }
    </div>
  )
}

export default CopyTextIcon