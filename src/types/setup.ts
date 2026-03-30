import type { Idea } from "./idea";

export interface SetupOption {
  id: string;
  label: string;
  ideaSlugs: Idea["slug"][];
  signals: string[];
}

export interface SetupQuestion {
  id: string;
  title: string;
  options: SetupOption[];
}

export interface SetupRecommendation {
  primaryIdea: Idea;
  supportingIdeas: Idea[];
  matchedOptions: SetupOption[];
  focusSignals: string[];
}
