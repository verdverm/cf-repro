import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

import type { BundledLanguage } from 'shiki'
import { codeToHtml } from 'shiki'
import { addCopyButton } from 'shiki-transformer-copy-button'

// optional
const options = {
  // delay time from "copied" state back to normal state
  toggle: 2000,
  // matchAlgorithm: 'v3', 
}


interface Props {
  children: string
  lang: BundledLanguage
}

async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    theme: 'nord',
    transformers: [
      addCopyButton(options),
    ]
  })

  return <div className="hello" dangerouslySetInnerHTML={{ __html: out }} />
}
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    code: (props) => {
      const lang = props.className ? props.className.split("-")[1] : "txt"
      return (
        <div className="text-sm">
          <CodeBlock lang={lang}>
            {props.children}
          </CodeBlock>
        </div>
      )
    },
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    ...components,
  }
}