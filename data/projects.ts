export type Project = { name: string; github: string };
export type LiveProject = { name: string; liveUrl: string; screenshot?: string };

// Add new source projects here. The page updates automatically.
export const projects: Project[] = [];

// Keep this list only for projects with a working deployed URL.
export const liveProjects: LiveProject[] = [];
