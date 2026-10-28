import type { Referee } from "./types";

/**
 * Referees' contact details are not published on the website or in the public CV PDFs.
 * They appear only in the private CV built by `npm run cv:private` (written to /private-cv,
 * which is git-ignored and never deployed). Ask your referees before sharing their details.
 */
export const referees: Referee[] = [
  {
    name: "Dr. Fernaz Narin Nur",
    title: "Associate Dean & Professor",
    department: "Department of Computer Science and Engineering",
    institution: "Daffodil International University",
    email: "fernaz.cse@diu.edu.bd",
  },
  {
    name: "Md. Hasanuzzaman Dipu",
    title: "Assistant Professor",
    department: "Department of Computer Science and Engineering",
    institution: "Daffodil International University",
    email: "dipu.cse@diu.edu.bd",
  },
];
