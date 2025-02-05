import { ReactNode, useMemo } from "react"

import { cn } from "@/lib/utils"

const MdxContent = ({
  className,
  children,
}: {
  className?: string
  children: any
}): ReactNode => {
  return (
    <article className={cn(
      "prose dark:prose-invert",
      "prose-li:my-2 prose-p:my-0",
      className,
    )}>
      {children}
    </article>
  )
}

export default MdxContent;