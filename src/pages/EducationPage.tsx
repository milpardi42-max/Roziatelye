import { useI18n } from "@/lib/i18n";
import { courses } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { CourseCard } from "@/components/cards/CourseCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function EducationPage() {
  const { t } = useI18n();
  const featured = courses.filter((c) => c.featured);
  const popular = courses.filter((c) => c.popular);

  return (
    <>
      <PageHeader eyebrow={t("section.education.eyebrow")} title={t("section.education.title")} />

      {/* Featured */}
      {featured.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="container-page">
            <SectionHeader eyebrow="Featured" title={t("section.education.title")} />
            <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((c) => <CourseCard key={c.slug} course={c} />)}
            </Reveal>
          </div>
        </section>
      )}

      {/* Popular */}
      <section className="py-16 lg:py-20 bg-[#f5f5f7]">
        <div className="container-page">
          <SectionHeader eyebrow="Popular" title={t("sort.popular")} />
          <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((c) => <CourseCard key={c.slug} course={c} />)}
          </Reveal>
        </div>
      </section>

      {/* All */}
      <section className="py-16 lg:py-20">
        <div className="container-page">
          <SectionHeader eyebrow="All courses" title={t("nav.education")} />
          <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((c) => <CourseCard key={c.slug} course={c} />)}
          </Reveal>
        </div>
      </section>
    </>
  );
}
