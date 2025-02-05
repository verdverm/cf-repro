import Hello from "@/app/hello.mdx"
import BlueskyEmbed from "@/components/atproto/bluesky-embed"

import Hack from "@/components/hack"

export default function Home() {

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="prose my-16 mx-8 font-light">
          <Hello />
        </div>

        { process.env.NODE_ENV === "development" ? <Hack /> : null }

        <BlueskyEmbed />

        {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}


      </div>
    </div>
  )
}
