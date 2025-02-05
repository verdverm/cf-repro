
import {
  AtSign
} from "lucide-react"

import { OauthForm } from "@/components/atproto/forms/oauth"

export default function Login() {
  return (
    <div className="h-full w-full flex justify-center pt-20">
      <div className="w-full max-w-2xl flex flex-col items-center">

        <div className="flex flex-col items-center p-8">
          <span className="flex items-center text-3xl">
            Login with <AtSign size={32} className="text-bluesky-blue ml-2 mr-0"/> <span className="text-bluesky-blue">AT</span>Protocol
          </span>
          <span className="text-center">an evolution in social media</span>
        </div>

        <div className="flex flex-col p-8 w-100 border rounded">
          <OauthForm />
        </div>

      </div>
    </div>
  )  
}