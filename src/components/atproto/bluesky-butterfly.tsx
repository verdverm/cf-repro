import Image from 'next/image'

import { cn } from '@/lib/utils'

export default function BlueskyButterfly({ className }: { className: string }) {
  return (
    <Image
      src="/bluesky.svg"
      width={16}
      height={16}
      alt="verdverm"
      className={cn(
        className
      )}
      style={{color: "linear-gradient(rgb(18, 133, 254) 0px, rgb(0, 101, 207))"}}
    />
  )
}

