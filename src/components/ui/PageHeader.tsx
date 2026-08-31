import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-[#d2d2d7]/60 bg-white">
      <div className="container-page py-16 lg:py-24">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <h1 className="font-display text-[2.5rem] text-balance leading-[1.05] md:text-[3.5rem] lg:text-[4.5rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-[17px] text-foreground-secondary text-pretty leading-relaxed">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
