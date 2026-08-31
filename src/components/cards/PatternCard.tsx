import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye } from "lucide-react";
import { useI18n, useCurrency } from "@/lib/i18n";
import { getArtist, getStyle, type Pattern } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

export function PatternCard({ pattern }: { pattern: Pattern }) {
  const { t, lang, dir } = useI18n();
  const { format } = useCurrency();
  const [fav, setFav] = useState(false);
  const artist = getArtist(pattern.artistSlug);
  const style = getStyle(pattern.style);
  const name = lang === "fa" ? pattern.nameFa : pattern.name;

  return (
    <article className="group card-lift rounded-2xl overflow-hidden border border-[#d2d2d7]/60 bg-white">
      <div className="zoom-img relative aspect-[4/5] overflow-hidden bg-background-secondary">
        <Link to={`/patterns/${pattern.slug}`}>
          <img
            src={pattern.image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </Link>
        <div className="absolute top-3 start-3 flex flex-col gap-1.5">
          {pattern.trending && <Badge tone="slate">Trending</Badge>}
          {pattern.exclusive && <Badge tone="accent">Exclusive</Badge>}
        </div>
        <button
          onClick={() => setFav((f) => !f)}
          className="absolute top-3 end-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-foreground hover:text-accent transition-colors"
          aria-label={t("action.favorite")}
        >
          <Heart className={`h-[16px] w-[16px] ${fav ? "fill-accent text-accent" : ""}`} />
        </button>
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <Link
            to={`/patterns/${pattern.slug}`}
            className="flex items-center justify-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-3 py-2 text-[12px] font-medium text-foreground hover:bg-white transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            {t("action.viewPattern")}
          </Link>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <Link to={`/patterns/${pattern.slug}`}>
            <h3 className="text-[14px] font-medium line-clamp-1 hover:text-accent transition-colors">
              {name}
            </h3>
          </Link>
          <span className="text-[13px] font-semibold text-foreground tabular-nums">
            {t("common.from")} {format(pattern.price)}
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-muted">
          {artist && (
            <Link
              to={`/artists/${artist.slug}`}
              className="hover:text-foreground-secondary transition-colors"
            >
              {lang === "fa" ? artist.nameFa : artist.name}
            </Link>
          )}
          <span>·</span>
          <span>{style ? (lang === "fa" ? style.nameFa : style.name) : "—"}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {pattern.applications.slice(0, 3).map((a) => (
            <span
              key={a}
              className="rounded-full border border-[#d2d2d7]/60 px-2 py-0.5 text-[11px] text-muted"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
