import { ImageResponse } from 'next/og'

export function GET(request: Request) {
  let url = new URL(request.url)
  let title = url.searchParams.get('title') || 'sagar_builds — Sagar Tamang'

  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full justify-between bg-black text-white p-16"
        style={{ fontFamily: 'serif' }}
      >
        <div tw="flex flex-col">
          <div tw="flex items-center mb-4">
            <span tw="text-lg text-neutral-400">sagartamang.com</span>
          </div>
          <h2 tw="flex flex-col text-5xl font-bold tracking-tight text-left leading-tight">
            {title}
          </h2>
        </div>
        <div tw="flex items-center justify-between w-full">
          <div tw="flex items-center">
            <span tw="text-2xl font-bold text-white">@sagar_builds</span>
            <span tw="text-xl text-neutral-400 ml-4">AI Engineer · Builder · Creator</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
