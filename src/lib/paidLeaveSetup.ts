import { paidLeaveSetupFallbackSlugs, paidLeaveSetupQuestions } from "../data/paidLeaveSetup";
import type { Idea } from "../types/idea";
import type { SetupOption, SetupRecommendation } from "../types/setup";

const optionLookup = new Map<string, SetupOption>(
  paidLeaveSetupQuestions.flatMap((question) => question.options.map((option) => [option.id, option] as const)),
);

export function getPaidLeaveSetupRecommendation(
  ideas: Idea[],
  answers: Record<string, string[]>,
): SetupRecommendation {
  const matchedOptions = paidLeaveSetupQuestions.flatMap((question) =>
    (answers[question.id] ?? []).map((optionId) => optionLookup.get(optionId)).filter((option): option is SetupOption => Boolean(option)),
  );

  const scoreMap = new Map<Idea["slug"], number>();

  matchedOptions.forEach((option) => {
    option.ideaSlugs.forEach((slug, index) => {
      const weight = Math.max(1, 4 - index);
      scoreMap.set(slug, (scoreMap.get(slug) ?? 0) + weight);
    });
  });

  const rankedIdeas = [...ideas].sort((left, right) => {
    const scoreDelta = (scoreMap.get(right.slug) ?? 0) - (scoreMap.get(left.slug) ?? 0);
    if (scoreDelta !== 0) {
      return scoreDelta;
    }

    const featuredDelta = Number(Boolean(right.featured)) - Number(Boolean(left.featured));
    if (featuredDelta !== 0) {
      return featuredDelta;
    }

    return left.id - right.id;
  });

  const selectedIdeas: Idea[] = [];

  rankedIdeas.forEach((idea) => {
    if ((scoreMap.get(idea.slug) ?? 0) <= 0) {
      return;
    }

    selectedIdeas.push(idea);
  });

  paidLeaveSetupFallbackSlugs.forEach((slug) => {
    const fallbackIdea = ideas.find((idea) => idea.slug === slug);
    if (fallbackIdea && !selectedIdeas.some((idea) => idea.slug === fallbackIdea.slug)) {
      selectedIdeas.push(fallbackIdea);
    }
  });

  const [primaryIdea, ...rest] = selectedIdeas.slice(0, 3);
  const focusSignals = Array.from(new Set(matchedOptions.flatMap((option) => option.signals))).slice(0, 4);

  return {
    primaryIdea: primaryIdea ?? ideas[0],
    supportingIdeas: rest,
    matchedOptions,
    focusSignals,
  };
}
