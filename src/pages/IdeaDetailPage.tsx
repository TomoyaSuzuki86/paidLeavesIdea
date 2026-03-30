import { Link, useParams } from "react-router-dom";
import { IdeaDetailLayout } from "../components/ideas/IdeaDetailLayout";
import { ideas } from "../data/ideas";
import { getIdeaBySlug } from "../lib/filters";
import { NotFoundPage } from "./NotFoundPage";

export function IdeaDetailPage() {
  const { slug } = useParams();
  const idea = getIdeaBySlug(ideas, slug);

  if (!idea) {
    return <NotFoundPage />;
  }

  const relatedIdeas = idea.related_ideas
    .map((relatedSlug) => ideas.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate));

  return (
    <main className="page">
      <section className="section">
        <div className="shell">
          <div className="breadcrumb-row">
            <Link className="text-link" to="/ideas">
              一覧へ戻る
            </Link>
            <span>/</span>
            <span>{idea.title}</span>
          </div>
          <IdeaDetailLayout idea={idea} relatedIdeas={relatedIdeas} />
        </div>
      </section>
    </main>
  );
}
