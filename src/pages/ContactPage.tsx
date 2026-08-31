import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader eyebrow={t("nav.contact")} title={t("contact.title")} subtitle={t("contact.subtitle")} />
      <section className="py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Form */}
            <div>
              <p className="eyebrow mb-5">Send a message</p>
              <h2 className="font-display text-[1.75rem] leading-tight md:text-[2.25rem]">
                Let's talk
              </h2>
              {sent ? (
                <div className="mt-8 rounded-2xl border border-[#d2d2d7]/60 bg-[#f5f5f7] p-10 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-success-soft text-success">
                    <Send className="h-5 w-5" />
                  </div>
                  <p className="mt-4 font-medium text-[15px]">Thank you — we'll be in touch shortly.</p>
                  <p className="mt-1 text-[13px] text-muted">Usually within one business day.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="mt-8 space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={t("checkout.firstName")} required />
                    <Field label={t("checkout.lastName")} required />
                  </div>
                  <Field label={t("checkout.email")} type="email" required />
                  <label className="block">
                    <span className="mb-2 block text-[12px] font-medium text-muted tracking-wide uppercase">Subject</span>
                    <select className="h-11 w-full rounded-[10px] border border-[#d2d2d7] bg-white px-3.5 text-[14px] outline-none focus:border-foreground transition-colors cursor-pointer">
                      <option>General inquiry</option>
                      <option>Pattern licensing</option>
                      <option>B2B / Custom production</option>
                      <option>Order support</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[12px] font-medium text-muted tracking-wide uppercase">Message</span>
                    <textarea
                      required
                      rows={5}
                      className="w-full rounded-[10px] border border-[#d2d2d7] bg-white p-3.5 text-[14px] outline-none focus:border-foreground transition-colors resize-none"
                    />
                  </label>
                  <Button type="submit" variant="primary" size="lg">
                    <Send className="h-4 w-4" />
                    Send message
                  </Button>
                </form>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="eyebrow mb-5">Reach us</p>
              <h2 className="font-display text-[1.75rem] leading-tight md:text-[2.25rem]">
                Get in touch
              </h2>
              <div className="mt-8 space-y-3">
                <ContactRow icon={<Mail className="h-4 w-4" />} label="Email" value="hello@patrao.studio" />
                <ContactRow icon={<Phone className="h-4 w-4" />} label="Phone" value="+1 (415) 555-0142" />
                <ContactRow icon={<MapPin className="h-4 w-4" />} label="Studio" value="Lisbon · Tehran · Kashan" />
              </div>
              <div className="mt-8 rounded-2xl border border-[#d2d2d7]/60 bg-[#f5f5f7] p-7">
                <h3 className="font-medium text-[14px]">Studio hours</h3>
                <p className="mt-3 text-[14px] text-foreground-secondary leading-relaxed">
                  Mon–Fri, 9:00–18:00 (WET)
                </p>
                <p className="text-[14px] text-foreground-secondary">
                  We reply within one business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-medium text-muted tracking-wide uppercase">
        {label}{required && <span className="text-accent"> *</span>}
      </span>
      <input
        type={type}
        required={required}
        className="h-11 w-full rounded-[10px] border border-[#d2d2d7] bg-white px-3.5 text-[14px] outline-none focus:border-foreground transition-colors"
      />
    </label>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-[10px] border border-[#d2d2d7]/60 bg-white p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background-secondary text-foreground-secondary shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-muted tracking-wide uppercase">{label}</p>
        <p className="font-medium text-[14px] mt-0.5">{value}</p>
      </div>
    </div>
  );
}
