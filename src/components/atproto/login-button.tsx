import Link from 'next/link';

import {
  AtSign
} from "lucide-react"

import { cn } from '@/lib/utils';

const ATProtoLogin = (props) => {
  return (
    <Link 
      href="/sign-in"
      className={cn(
        props.className,
        "flex items-center",
        "py-1 px-3",
        "border-1 rounded-md",
        "border-bluesky-blue",
        "hover:bg-gray-50 hover:shadow-bluesky-blue hover:shadow-xl",
      )}
    >
      <AtSign size={16} className="text-bluesky-blue mr-[2px]"/> <span className="text-bluesky-blue">AT</span>Protocol
    </Link>
  )

}

export default ATProtoLogin