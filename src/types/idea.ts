export type IdeaScale = "低" | "中" | "高";

export interface Idea {
  id: number;
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  cost: IdeaScale;
  impact: IdeaScale;
  novelty: IdeaScale;
  owner: string;
  tone: string;
  featured?: boolean;
  featuredReason?: string;
  why_it_works: string[];
  target_problem: string[];
  how_to_implement: string[];
  operation_flow: string[];
  expected_effect: string[];
  suitable_for: string[];
  not_suitable_for: string[];
  cost_detail: string[];
  required_stakeholders: string[];
  risks: string[];
  mitigations: string[];
  kpi_examples: string[];
  example_internal_message: string[];
  pilot_plan: string[];
  related_ideas: string[];
}

export interface IdeaPack {
  slug: string;
  title: string;
  summary: string;
  audience: string;
  whyThisPack: string;
  ideaSlugs: string[];
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  summary: string;
  actions: string[];
}
