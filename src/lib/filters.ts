import type { Idea } from "../types/idea";

export function getAllTags(ideas: Idea[]) {
  return Array.from(new Set(ideas.flatMap((idea) => idea.tags))).sort((a, b) => a.localeCompare(b, "ja"));
}

export function filterIdeas(ideas: Idea[], query: string, activeTag: string) {
  const normalized = query.trim().toLowerCase();

  return ideas.filter((idea) => {
    const tagMatch = activeTag === "すべて" || idea.tags.includes(activeTag);
    if (!tagMatch) {
      return false;
    }

    if (!normalized) {
      return true;
    }

    const haystack = [
      idea.title,
      idea.summary,
      idea.owner,
      idea.tone,
      ...idea.tags,
      ...idea.target_problem,
      ...idea.expected_effect,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

export function getIdeaBySlug(ideas: Idea[], slug?: string) {
  return ideas.find((idea) => idea.slug === slug);
}
