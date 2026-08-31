import { Link } from "react-router-dom";
import { Clock, PlayCircle, BarChart3 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getArtist, type Course } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

export function CourseCard({ course }: { course: Course }) {
  const { t, lang } = useI18n();
  const author = getArtist(course.authorSlug);
  const title = lang === "fa" ? course.titleFa : course.title;

  const levelTone =
    course.level === "Beginner"
      ? "success"
      : course.level === "Intermediate"
        ? "warning"
        : "error";

  return (
    <Link
      to={`/education/${course.slug}`}
      className="group surface-card overflow-hidden flex flex-col transition-all duration-300 hover:shadow-medium hover:border-border-strong"
    >
      <div className="zoom-img relative aspect-[16/10] overflow-hidden bg-background-secondary">
        <img
          src={course.cover}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 start-3">
          <Badge tone={levelTone as "success" | "warning" | "error"}>
            {course.level}
          </Badge>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <PlayCircle className="h-12 w-12 text-white drop-shadow-lg" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs text-muted">{course.category}</span>
        <h3 className="mt-1 font-medium group-hover:text-accent transition-colors line-clamp-2">
          {title}
        </h3>
        {author && (
          <p className="mt-1 text-xs text-foreground-secondary">
            {lang === "fa" ? author.nameFa : author.name}
          </p>
        )}
        <div className="mt-auto flex items-center gap-4 pt-3 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5" />
            {course.episodes} {t("course.episodes")}
          </span>
        </div>
      </div>
    </Link>
  );
}
