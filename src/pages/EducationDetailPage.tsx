import { useParams, Link, Navigate } from "react-router-dom";
import { Clock, BarChart3, PlayCircle, BookOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getCourse, getArtist, getPattern, getProduct, type Product } from "@/lib/data";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CourseCard } from "@/components/cards/CourseCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { PatternCard } from "@/components/cards/PatternCard";
import { courses } from "@/lib/data";
import { QuickView } from "@/components/cards/QuickView";

export function EducationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const [quick, setQuick] = useState<Product | null>(null);

  const course = slug ? getCourse(slug) : undefined;
  if (!course) return <Navigate to="/education" replace />;

  const author = getArtist(course.authorSlug);
  const title = lang === "fa" ? course.titleFa : course.title;
  const overview = lang === "fa" ? course.overviewFa : course.overview;
  const relatedCourses = courses.filter((c) => c.slug !== course.slug && c.category === course.category).slice(0, 4);
  const relatedPatterns = course.patternSlugs.map(getPattern).filter(Boolean);
  const relatedProducts = course.productSlugs.map(getProduct).filter(Boolean);

  const levelTone = course.level === "Beginner" ? "success" : course.level === "Intermediate" ? "warning" : "error";

  return (
    <>
      <div className="border-b border-border bg-background-secondary/30">
        <div className="container-page py-4">
          <nav className="flex items-center gap-2 text-xs text-muted">
            <Link to="/" className="hover:text-accent">{t("nav.home")}</Link>
            <span>/</span>
            <Link to="/education" className="hover:text-accent">{t("nav.education")}</Link>
            <span>/</span>
            <span className="text-foreground">{title}</span>
          </nav>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Cover */}
            <div className="zoom-img relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
              <img src={course.cover} alt={title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="neutral">{course.category}</Badge>
                <Badge tone={levelTone as "success" | "warning" | "error"}>{course.level}</Badge>
              </div>
              <h1 className="mt-3 font-display text-3xl md:text-4xl">{title}</h1>
              {author && (
                <Link to={`/artists/${author.slug}`} className="mt-2 inline-block text-sm text-foreground-secondary hover:text-accent transition-colors">
                  {t("label.author")}: {lang === "fa" ? author.nameFa : author.name}
                </Link>
              )}
              <div className="mt-4 flex items-center gap-6 text-sm text-foreground-secondary">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-accent" />{course.duration}</span>
                <span className="flex items-center gap-1.5"><BarChart3 className="h-4 w-4 text-accent" />{course.episodes} {t("course.episodes")}</span>
              </div>
              <p className="mt-6 text-foreground-secondary text-pretty leading-relaxed">{overview}</p>
              <div className="mt-8 flex gap-3">
                <Button variant="primary" size="lg">
                  <BookOpen className="h-4 w-4" />
                  {t("course.start")}
                </Button>
              </div>
            </div>
          </div>

          {/* Episodes */}
          <div className="mt-16">
            <h2 className="font-display text-2xl">{t("course.episodes")}</h2>
            <div className="mt-6 space-y-2">
              {Array.from({ length: course.episodes }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-border p-4 hover:bg-background-secondary transition-colors">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background-secondary text-sm font-medium text-foreground-secondary">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{lang === "fa" ? `قسمه ${i + 1}` : `Episode ${i + 1}`}</p>
                    <p className="text-xs text-muted">{Math.floor(Math.random() * 20 + 10)} min</p>
                  </div>
                  <PlayCircle className="h-5 w-5 text-muted" />
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          {relatedPatterns.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl">{t("label.relatedPatterns")}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {relatedPatterns.map((p) => p && <PatternCard key={p.slug} pattern={p} />)}
              </div>
            </div>
          )}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl">{t("label.relatedProducts")}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((p) => p && <ProductCard key={p.slug} product={p} onQuickView={setQuick} />)}
              </div>
            </div>
          )}
          {relatedCourses.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl">{t("label.relatedCourses")}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {relatedCourses.map((c) => <CourseCard key={c.slug} course={c} />)}
              </div>
            </div>
          )}
        </div>
      </section>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}
