import { paidLeaveIdeas, featuredPaidLeaveIdeas } from "./paidLeaveIdeas";
import { paidLeavePacks } from "./paidLeavePacks";
import { paidLeaveRoadmap } from "./paidLeaveRoadmap";
import { sleepIdeas, featuredSleepIdeas, sleepPacks, sleepRoadmap } from "./sleepIdeas";
import { themeMap, themes } from "./themes";
import type { ThemeKey, ThemeLibrary } from "../types/idea";

export const libraries: Record<ThemeKey, ThemeLibrary> = {
  "paid-leave": {
    theme: themeMap["paid-leave"],
    ideas: paidLeaveIdeas,
    featuredIdeas: featuredPaidLeaveIdeas,
    packs: paidLeavePacks,
    roadmap: paidLeaveRoadmap,
  },
  sleep: {
    theme: themeMap.sleep,
    ideas: sleepIdeas,
    featuredIdeas: featuredSleepIdeas,
    packs: sleepPacks,
    roadmap: sleepRoadmap,
  },
};

export function getLibrary(theme: ThemeKey) {
  return libraries[theme];
}

export { themes };
