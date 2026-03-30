import type { Idea, ThemeKey } from "./idea";

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
  themeKey: ThemeKey;
  primaryIdea: Idea;
  supportingIdeas: Idea[];
  matchedOptions: SetupOption[];
  focusSignals: string[];
}
