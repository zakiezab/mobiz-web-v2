import { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Privacy Policy - Mobiz",
  description:
    "Mobiz privacy policy - How we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        description="Your privacy is important to us. This policy explains how we collect, use, and protect your information."
      />

      <section className="bg-white py-40">
        <div className="mx-auto w-full max-w-container px-20">
          <div className="max-w-4xl space-y-16">
            <div>
              <h2 className="text-3xl font-light text-dark mb-6">
                Information We Collect
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-700">
                <p>
                  We collect information you provide directly to us, such as
                  when you contact us through our website, request information
                  about our services, or engage with our content.
                </p>
                <p>
                  This may include your name, email address, company name, and
                  any information you choose to provide in messages or contact
                  forms.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-light text-dark mb-6">
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Respond to your inquiries and provide requested information
                  </li>
                  <li>Provide our services and support</li>
                  <li>Improve our website and services</li>
                  <li>Communicate with you about our services and offerings</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-light text-dark mb-6">
                Information Sharing
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-700">
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties without your consent, except as
                  described in this policy.
                </p>
                <p>
                  We may share your information with trusted service providers
                  who assist us in operating our website and conducting our
                  business, provided those parties agree to keep this
                  information confidential.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-light text-dark mb-6">
                Data Security
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-700">
                <p>
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction.
                </p>
                <p>
                  However, no method of transmission over the internet or method
                  of electronic storage is 100% secure. While we strive to use
                  commercially acceptable means to protect your personal
                  information, we cannot guarantee its absolute security.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-light text-dark mb-6">
                Cookies and Tracking
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-700">
                <p>
                  Our website uses cookies and similar tracking technologies to
                  enhance your experience and analyze website traffic. You can
                  control cookie settings through your browser preferences.
                </p>
                <p>
                  We use Google Analytics with cookie consent management. No
                  analytics data is collected until you provide explicit consent
                  through our consent banner.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-light text-dark mb-6">
                Your Rights
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Object to processing of your personal information</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-light text-dark mb-6">Contact Us</h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-700">
                <p>
                  If you have questions about this Privacy Policy or how we
                  handle your personal information, please contact us through
                  our website or at privacy@mobiz.com.
                </p>
                <p>
                  This policy may be updated from time to time. We will notify
                  you of any changes by posting the new policy on this page and
                  updating the "Last Updated" date.
                </p>
              </div>
            </div>

            <div className="border-t pt-8">
              <p className="text-sm text-gray-500">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA
        title="Have questions about your data?"
        description="We're committed to transparency and protecting your privacy. Reach out if you have any concerns."
        ctaLabel="Contact Us"
      />
    </>
  );
}
