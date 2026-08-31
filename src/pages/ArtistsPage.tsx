import { useI18n } from "@/lib/i18n";
import { artists } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArtistCard } from "@/components/cards/ArtistCard";
import { Reveal } from "@/components/ui/Reveal";

export function ArtistsPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t("section.artists.eyebrow")} title={t("section.artists.title")} />
      <section className="py-14 lg:py-20">
        <div className="container-page">
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {artists.map((a) => <ArtistCard key={a.slug} artist={a} />)}
          </Reveal>
        </div>
      </section>
    </>
  );
}
