import {draftMode} from 'next/headers'
import {NextResponse} from 'next/server'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== process.env.SANITY_PREVIEW_SECRET || !slug) {
    return new NextResponse('Invalid preview request', {status: 401})
  }

  const draft = await draftMode()
  draft.enable()

  const redirectUrl = new URL(slug, siteUrl ?? 'http://localhost:3000')

  return NextResponse.redirect(redirectUrl)
}
