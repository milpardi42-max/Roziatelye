import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { getArtist, type Portfolio } from "@/lib/data";

export function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const { t, lang } = useI18n();
  const artist = getArtist(portfolio.artistSlug);
  const title = lang === "fa" ? portfolio.titleFa : portfolio.title;

  return (
    <Link
      to={`/portfolio/${portfolio.slug}`}
      className="group surface-card overflow-hidden flex flex-col transition-all duration-300 hover:shadow-medium hover:border-border-strong"
    >
      <div className="zoom-img relative aspect-[16/10] overflow-hidden bg-background-secondary">
        <img
          src={portfolio.cover}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-4 start-4 end-4">
          <span className="text-xs font-medium text-white/80">
            {portfolio.category} · {portfolio.year}
          </span>
          <h3 className="mt-1 font-display text-xl text-white">{title}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm text-foreground-secondary line-clamp-2">
          {lang === "fa" ? portfolio.overviewFa : portfolio.overview}
        </p>
        {artist && (
          <p className="mt-auto pt-3 text-xs text-muted">
            {t("label.creator")}:{" "}
            <span className="text-foreground-secondary group-hover:text-accent transition-colors">
              {lang === "fa" ? artist.nameFa : artist.name}
            </span>
          </p>
        )}
      </div>
    </Link>
  );
}
