import { Link, useParams } from "react-router-dom";
import { IdeaDetailLayout } from "../components/ideas/IdeaDetailLayout";
import { getLibrary } from "../data/libraries";
import { getIdeaBySlug } from "../lib/filters";
import type { ThemeKey } from "../types/idea";
import { NotFoundPage } from "./NotFoundPage";

interface ThemeIdeaDetailPageProps {
  themeKey: ThemeKey;
}

export function ThemeIdeaDetailPage({ themeKey }: ThemeIdeaDetailPageProps) {
  const { slug } = useParams();
  const library = getLibrary(themeKey);
  const idea = getIdeaBySlug(library.ideas, slug);

  if (!idea) {
    return <NotFoundPage />;
  }

  const relatedIdeas = idea.related_ideas
    .map((relatedSlug) => library.ideas.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate));

  return (
    <main className={`page theme-page theme-${themeKey}`}>
      <section className="section">
        <div className="shell">
          <div className="breadcrumb-row">
            <Link className="text-link" to={`${library.theme.basePath}`}>
              テーマトップ
            </Link>
            <span>/</span>
            <Link className="text-link" to={`${library.theme.basePath}/ideas`}>
              一覧
            </Link>
            <span>/</span>
            <span>詳細</span>
          </div>
          <IdeaDetailLayout idea={idea} themeKey={themeKey} relatedIdeas={relatedIdeas} />
        </div>
      </section>
    </main>
  );
}
