export type Certificate = {
  title: string;
  issuer: string;
  date?: string;
  detail?: string;
  href?: string;
};

export type CertificateGroup = {
  category: "Courses" | "Competitions" | "Programs / Workshops";
  items: Certificate[];
};

export const certificates: CertificateGroup[] = [
  {
    category: "Courses",
    items: [
      {
        title: "Orchestrating Data Pipelines in Microsoft Fabric",
        issuer: "Microsoft · Coursera",
        date: "Sep 2026",
        href: "/certificates/orchestrating-data-pipelines-microsoft-fabric.pdf",
      },
      {
        title: "Preparing Data for Analytics in Microsoft Fabric",
        issuer: "Microsoft · Coursera",
        date: "Aug 2026",
        href: "/certificates/preparing-data-for-analytics-microsoft-fabric.pdf",
      },
      {
        title: "Fabric Foundations and Environment Management",
        issuer: "Microsoft · Coursera",
        date: "Aug 2026",
        href: "/certificates/fabric-foundations-environment-management.pdf",
      },
      {
        title: "CrewAI Tools, MCP, and Agentic RAG",
        issuer: "Edureka · Coursera",
        date: "Jul 2026",
        href: "/certificates/crewai-tools-mcp-agentic-rag.pdf",
      },
    ],
  },
  {
    category: "Competitions",
    items: [
      {
        title: "HackerRank Orchestrate",
        issuer: "HackerRank",
        date: "Aug 2026",
        detail: "Final rank #140 of 1,983",
        href: "/certificates/hackerrank-orchestrate-august-2026.png",
      },
    ],
  },
  {
    category: "Programs / Workshops",
    items: [
      {
        title: "Summer School — Language and Vision with AI/ML",
        issuer: "IIT Guwahati",
      },
    ],
  },
];
