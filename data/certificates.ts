export type CertificateGroup = {
  category: "Courses" | "Competitions" | "Programs / Workshops";
  items: string[];
};

export const certificates: CertificateGroup[] = [
  { category: "Courses", items: [] },
  { category: "Competitions", items: [] },
  { category: "Programs / Workshops", items: ["IIT Guwahati Summer School — Language and Vision with AI/ML"] },
];
