import Link from "next/link"

import CopyTextIcon from "@/components/widgets/copy-text-icon"

function match(base: string) {
  if (base === "/blog") { return true }
  if (base === "/projects") { return true }
  if (base === "/topics") { return true }
}

export default function Breadcrumbs({ slugs }: { slugs: string[] }) {

  let base = ""
  return (
    <div className="flex text-xl w-full items-center">
      { slugs.map(slug => {
        base += "/" + slug
        return (
          <div key={slug} className="flex items-center">
            { match(base) ? null: <span className="p-3">/</span>}
            { slug === slugs.slice(-1)[0] ?
            <span className="flex items-center gap-2">{ slug } <CopyTextIcon text={`https://verdverm.com/${slugs.join("/")}`}/></span> 
            :
            <Link
              href={`${base}`}
              className="text-bluesky-blue"
            >{ slug }</Link>
            }
          </div>
        )
      })}
    </div>
  )
}