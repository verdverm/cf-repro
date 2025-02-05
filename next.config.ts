import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

if (process.env.NODE_ENV === 'development') {
  initOpenNextCloudflareForDev();
}
  
module.exports = async (phase, {defaultConfig }) => {

  const withMDX = require('@next/mdx')({
    // Optionally provide remark and rehype plugins
    options: {
      // If you use remark-gfm, you'll need to use next.config.mjs
      // as the package is ESM only
      // https://github.com/remarkjs/remark-gfm#install
      remarkPlugins: [],
      rehypePlugins: [],
      // If you use `MDXProvider`, uncomment the following line.
      // providerImportSource: "@mdx-js/react",
    },
  })

  const draftMode = process.env.NEXT_DRAFT_MODE
  if (draftMode === "1") {
    console.log("draftMode:", draftMode)
  }

  /** @type {import('next').NextConfig} */
  var config: NextConfig = {
    output: "standalone",
    pageExtensions:
      ['jsx', 'js', 'tsx', 'ts', 'mdx', 'md']
        .map((ext) => {
          if (draftMode === "1") { 
            return [ext, `draft.${ext}`]
          } else {
            return ext
          }
        })
        .flat()
      ,
    experimental: {
      // instrumentationHook: true,
      // serverComponentsExternalPackages: ['prom-client'],
      mdxRs: true,
    },

    images: {
      remotePatterns: [{
        protocol: "https",
        hostname: "cdn.bsky.app",
        port: '',
        pathname: "/img/**" ,
      }]
    },

    poweredByHeader: false,
    reactStrictMode: true,

    typescript: {
      ignoreBuildErrors: true,
    },

    // webpack: (config) => {
    //   config.externals.push({
    //     // 'node:crypto': 'commonjs crypto',
    //     // 'node:console': 'commonjs console',
    //     // 'node:http': 'commonjs http',
    //     // 'node:http2': 'commonjs http2',
    //     // 'node:net': 'commonjs net',
    //     // 'node:perf_hooks': 'commonjs perf_hooks',
    //     // 'node:querystring': 'commonjs querystring',
    //     // 'node:stream': 'commonjs stream',
    //     // 'node:tls': 'commonjs tls',
    //     // 'node:dns': 'commonjs dns',
    //     // 'node:dns/promises': 'commonjs dns/promises',
    //     // 'node:url': 'commonjs url',
    //     // 'node:util/types': 'commonjs util/types',
    //     // 'node:worker_threads': 'commonjs worker_threads',
    //     // 'node:zlib': 'commonjs zlib',
    //     // 'node:diagnostics_channel': 'commonjs diagnostics_channel',
    //   });
    //   // config.plugins.push(
    //   //   new webpack.ProvidePlugin({
    //   //     process: 'process/browser',
    //   //   }),
    //   //   new webpack.NormalModuleReplacementPlugin(
    //   //     /node:crypto/,
    //   //     (resource) => {
    //   //       resource.request = resource.request.replace(/^node:/, '');
    //   //     }
    //   //   )
    //   // );
    //   return config;
    // },

    // webpack: (
    //   config,
    //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    // ) => {
    //   // Important: return the modified config
    //     // Will ignore the modules fs, path, xlsx, request, vertx, and react-native modules
    //   config.plugins.push(new IgnorePlugin({
    //     resourceRegExp: /(react-native)/
    //   }))
    
    //   return config
    // },

  }

  // export default config;
  // config = removeImports(config)
  config = withMDX(config);

  return config
}
  