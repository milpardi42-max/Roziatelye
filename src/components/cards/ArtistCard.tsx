import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Artist } from "@/lib/data";

export function ArtistCard({ artist }: { artist: Artist }) {
  const { t, lang } = useI18n();
  const name = lang === "fa" ? artist.nameFa : artist.name;
  const profession = lang === "fa" ? artist.professionFa : artist.profession;
  const bio = lang === "fa" ? artist.bioFa : artist.bio;

  return (
    <Link
      to={`/artists/${artist.slug}`}
      className="group card-lift rounded-2xl overflow-hidden border border-[#d2d2d7]/60 bg-white flex flex-col"
    >
      <div className="zoom-img relative aspect-[5/4] overflow-hidden bg-background-secondary">
        <img
          src={artist.cover}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <img
          src={artist.avatar}
          alt={name}
          loading="lazy"
          className="absolute bottom-4 start-4 h-14 w-14 rounded-full border-2 border-white object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[14px] font-medium group-hover:text-accent transition-colors">{name}</h3>
            <p className="text-[12px] text-muted mt-0.5">{profession}</p>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-foreground-secondary">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="font-medium tabular-nums">{artist.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="mt-2.5 text-[12px] text-foreground-secondary line-clamp-2 leading-relaxed">{bio}</p>
        <div className="mt-auto flex items-center gap-2.5 pt-3.5 text-[11px] text-muted tracking-wide">
          <span>{artist.patternCount} {t("nav.patterns")}</span>
          <span>·</span>
          <span>{artist.productCount} {t("nav.products")}</span>
          <span>·</span>
          <span>{artist.projectCount} {t("nav.portfolio")}</span>
        </div>
      </div>
    </Link>
  );
}
