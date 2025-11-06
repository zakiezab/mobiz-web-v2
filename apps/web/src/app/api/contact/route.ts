import {createClient} from 'next-sanity'
import {NextResponse} from 'next/server'
import {Resend} from 'resend'
import {z} from 'zod'

import {dataset, projectId} from '@/lib/sanity.client'

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(1),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
    })
    .optional(),
})

const resendApiKey = process.env.RESEND_API_KEY
const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL
const sanityToken = process.env.SANITY_API_TOKEN

const resend =
  resendApiKey && notificationEmail ? new Resend(resendApiKey) : undefined

const writeClient =
  sanityToken != null && sanityToken.length > 0
    ? createClient({
        projectId,
        dataset,
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
        token: sanityToken,
        useCdn: false,
      })
    : null

export async function POST(request: Request) {
  const json = await request.json()
  const parsed = contactSchema.safeParse(json)

  if (!parsed.success) {
    return NextResponse.json(
      {errors: parsed.error.flatten().fieldErrors},
      {status: 400}
    )
  }

  const submission = parsed.data

  if (writeClient) {
    await writeClient.create({
      _type: 'contactSubmission',
      ...submission,
      submittedAt: new Date().toISOString(),
    })
  } else {
    console.warn(
      'SANITY_API_TOKEN missing - skipping contact submission persistence'
    )
  }

  if (resend && notificationEmail) {
    await resend.emails.send({
      from: 'Mobiz Website <no-reply@mobiz.com>',
      to: notificationEmail,
      subject: `New Mobiz inquiry from ${submission.name}`,
      html: `
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Company:</strong> ${submission.company ?? '—'}</p>
        <p><strong>Message:</strong></p>
        <p>${submission.message}</p>
        <p><strong>UTM Source:</strong> ${submission.utm?.source ?? '—'}</p>
        <p><strong>UTM Medium:</strong> ${submission.utm?.medium ?? '—'}</p>
        <p><strong>UTM Campaign:</strong> ${submission.utm?.campaign ?? '—'}</p>
      `,
    })
  }

  return NextResponse.json({
    ok: true,
    persisted: Boolean(writeClient),
    notified: Boolean(resend && notificationEmail),
  })
}
