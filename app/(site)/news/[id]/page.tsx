import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { CtaStrip, Arrow } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { news, newsBody, company, telDial } from "@/lib/site";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return news.map((n) => ({ id: n.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const item = news.find((n) => n.id === id);
  if (!item) return { title: "회사소식" };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: { title: item.title, description: item.excerpt, type: "article" },
  };
}

export default async function NewsDetailPage({ params }: Params) {
  const { id } = await params;
  const index = news.findIndex((n) => n.id === id);
  if (index === -1) notFound();

  const item = news[index];
  const body = newsBody[item.id] ?? [item.excerpt];
  const prev = news[index - 1];
  const next = news[index + 1];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "회사소식", href: "/news" },
          { name: item.title, href: `/news/${item.id}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: item.title,
            description: item.excerpt,
            datePublished: item.date,
            author: { "@type": "Organization", name: company.nameKoFull },
            publisher: { "@type": "Organization", name: company.nameKoFull },
          }),
        }}
      />

      <PageHero
        eyebrow={item.category}
        title={item.title}
        crumbs={[
          { label: "회사소식", href: "/news" },
          { label: item.category, href: "/news" },
        ]}
      />

      <article className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-4 border-b border-hairline pb-6">
            <span className="badge">{item.category}</span>
            <span className="text-[13px] font-bold text-mute">
              {item.date.replace(/-/g, ".")}
            </span>
          </div>

          <div className="mt-10 space-y-6">
            {body.map((p, i) => (
              <p key={i} className="p-lg text-body">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-14 border-t border-hairline pt-8">
            <p className="p-sm text-mute">
              본 내용에 대한 문의는 대표번호{" "}
              <a href={`tel:${telDial}`} className="font-bold accent">
                {company.tel}
              </a>{" "}
              또는{" "}
              <a href={`mailto:${company.email}`} className="font-bold accent">
                {company.email}
              </a>{" "}
              로 연락 주시기 바랍니다.
            </p>
          </div>
        </div>
      </article>

      {/* 이전 / 다음 */}
      <section className="border-t border-hairline">
        <div className="mx-auto grid max-w-[var(--maxw)] gap-px bg-hairline md:grid-cols-2">
          {[
            { item: prev, label: "이전 글" },
            { item: next, label: "다음 글" },
          ].map(({ item: n, label }) =>
            n ? (
              <Link key={label} href={`/news/${n.id}`} className="group bg-white p-8 hover:bg-soft">
                <span className="cap-xs text-mute">{label}</span>
                <p className="h4 mt-3 text-ink">{n.title}</p>
              </Link>
            ) : (
              <div key={label} className="bg-white p-8">
                <span className="cap-xs text-mute">{label}</span>
                <p className="h4 mt-3 text-stone">해당 글이 없습니다</p>
              </div>
            ),
          )}
        </div>

        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-10">
          <Link href="/news" className="btn btn-outline">
            <Arrow className="h-4 w-4 rotate-180" />
            목록으로
          </Link>
        </div>
      </section>

      <CtaStrip
        eyebrow="Contact"
        title="반입 단가나 배차 일정은 언제든 문의해 주십시오."
        href="/contact"
        cta="견적 문의하기"
      />
    </>
  );
}
