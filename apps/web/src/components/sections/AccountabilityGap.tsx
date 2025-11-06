import Image from "next/image"
import { TextAnimate } from "@/registry/magicui/text-animate"

interface AccountabilityGapProps {
  title: string
  body: string
}

export function AccountabilityGap({title, body}: AccountabilityGapProps) {
  return (
    <section className="py-56 min-h-fit relative">
      <div className="relative mx-auto w-full max-w-container px-16 2xl:px-6 flex flex-col justify-start ">
        <TextAnimate animation="blurIn" as="h2" className="section-title" scrollBased={true} blurAmount={15}>
          {title}
        </TextAnimate>
        <p className="section-description">
          {body}
        </p>
      </div>
    </section>
  )
}
