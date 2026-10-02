export type Project = { name: string; github: string };
export type LiveProject = { name: string; liveUrl: string; screenshot?: string };

// Add new source projects here. The page updates automatically.
export const projects: Project[] = [
  { name: "WWI — Microsoft Fabric Project", github: "https://github.com/hgh11code/wwi-fabric-project" },
  { name: "Coursera Git Lab", github: "https://github.com/hgh11code/coursera-git-lab" },
  { name: "Harsh Gupta — Portfolio", github: "https://github.com/hgh11code/harsh-gupta-portfolio" },
  { name: "HackerRank Orchestrate — Message Router", github: "https://github.com/hgh11code/hackerrank-orchestrate-message-router" },
  { name: "InsightGrid AI", github: "https://github.com/hgh11code/Insightgrid_AI" },
  { name: "Stock Price Prediction", github: "https://github.com/hgh11code/Stock-price-prediction" },
  { name: "Stock Price Prediction Models", github: "https://github.com/hgh11code/Stock-price-prediction-models" },
];

// Keep this list only for projects with a working deployed URL.
export const liveProjects: LiveProject[] = [
  { name: "Harsh Gupta — Portfolio", liveUrl: "https://harsh-gupta-portfolio-nine.vercel.app/" },
];
