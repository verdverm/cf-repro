"use client"
import Link from "next/link"
import { redirect } from 'next/navigation'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from '@/lib/utils';

import {
  AtSign
} from "lucide-react"
import BlueskyButterfly from "@/components/atproto/bluesky-butterfly"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  handle: z.string().min(2, {
    message: "Handle must be at least 2 characters.",
  }),
})

export function OauthForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      handle: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(evt: any, values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // This will be type-safe and validated.
    // evt.stopPropogation()

    console.log("VALUES:", values)
    const b = JSON.stringify(values)
    console.log(b)
    const resp = await fetch("/oauth/login", {
      method: "POST",
      headers: {
        ContentType: "application/json"
      },
      body: b
    })
    const data = await resp.json()
    console.log(data)
    if (data.error) {
      alert(data.error)
    }
    if (data.redirect) {
      redirect(data.redirect)
    }
  }

  return (
    <Form {...form}>
      <form 
        className="space-y-8"
        onSubmit={form.handleSubmit(async (evt) => await onSubmit(evt, form.getValues()))}
      >
        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex mb-2">
                <BlueskyButterfly className="mr-2"/><span className="ml-[4px] mr-2">Bluesky</span>
                | 
                <AtSign size={16} className="ml-2 mr-[1px] text-bluesky-blue"/> <span className="text-bluesky-blue">AT</span>Protocol
              </FormLabel>
              <FormControl>
                <Input placeholder="user.bsky.social" {...field} />
              </FormControl>
              <FormDescription>
                This is your handle.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-end justify-between">

        <Button
          type="submit"
          className={cn(
            "bg-white text-bluesky-blue",
            "border border-bluesky-blue",
            "hover:bg-gray-50 hover:shadow-bluesky-blue hover:shadow-xl",
          )}
        >Sign in</Button>
        <Link href="https://bsky.app/" className="text-bluesky-blue text-sm text-light">register on bluesky</Link>
        </div>
      </form>
    </Form>
  )
}