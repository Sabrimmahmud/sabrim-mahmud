/**
 * Content model for the site.
 *
 * Every page reads from the typed files in this folder. To add a paper, project,
 * award or article, add an entry to the matching file; no component changes are needed.
 *
 * `Pending` marks a fact that has not been supplied yet. It renders as a clearly
 * labelled "not added yet" note (see `site.showPending`) instead of invented text.
 */

export type Pending = { pending: string };

/** A value that is either known, or explicitly waiting to be supplied. */
export type Maybe<T> = T | Pending;

export function isPending<T>(value: Maybe<T> | undefined): value is Pending {
  return typeof value === "object" && value !== null && "pending" in value;
}

export type ExternalLink = {
  label: string;
  href: string;
};

export type Person = {
  name: string;
  /** Marks the site owner in author lists. */
  isSelf?: boolean;
};

export type PublicationStatus = "published" | "presented" | "preprint" | "in-progress";

export type Publication = {
  slug: string;
  title: string;
  authors: Person[];
  authorNote?: string;
  year: number;
  status: PublicationStatus;
  /** e.g. "Conference paper" or "Conference paper, published as a book chapter". */
  type: string;
  venue: {
    name: string;
    short: string;
    publisher: string;
    series?: string;
    volume?: string;
    pages?: Maybe<string>;
    location?: string;
    dates?: string;
  };
  doi: string;
  topics: string[];
  /** Paraphrased from the published abstract. Replace with your own wording if you prefer. */
  summary: string;
  summarySource: string;
  problem: Maybe<string>;
  method: Maybe<string>;
  contribution: Maybe<string>;
  /** Only results stated in the published abstract or paper. */
  results: Maybe<{ label: string; value: string }[]>;
  dataset?: Maybe<string>;
  links: {
    paper?: Maybe<string>;
    code?: Maybe<string>;
    dataset?: Maybe<string>;
    slides?: Maybe<string>;
  };
  presentation?: { event: string; date: string; location: string; evidence?: string };
  featured: boolean;
};

export type ProjectCategory = "NLP" | "Full-stack" | "Medical AI" | "LLM systems";

export type DiagramStep = { label: string; detail?: string };

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  categories: ProjectCategory[];
  context: Maybe<string>;
  period: Maybe<string>;
  role: string;
  summary: string;
  problem: Maybe<string>;
  objectives: Maybe<string[]>;
  responsibilities: string[];
  architecture: {
    note: string;
    steps: DiagramStep[];
  };
  stack: string[];
  implementation: string[];
  challenges: Maybe<string[]>;
  solutions: Maybe<string[]>;
  outcomes: Maybe<string[]>;
  screenshots: Maybe<{ src: string; alt: string; width: number; height: number; caption: string }[]>;
  /**
   * Optional cover image for project cards. Without one, the card shows the first screenshot,
   * and without screenshots it draws the project's pipeline from `architecture.steps`.
   */
  cover?: { src: string; alt: string; width: number; height: number };
  links: { code?: Maybe<string>; demo?: Maybe<string> };
  /** Set when the project was also submitted as a thesis. */
  thesis?: string;
  /** Anything a visitor should know before reading, e.g. confidentiality. */
  notice?: string;
  featured: boolean;
};

export type Role = {
  slug: string;
  title: string;
  organization: string;
  unit?: string;
  location: string;
  start: string;
  end: string;
  /** Set while part of the date range still needs confirming. */
  endNeedsConfirmation?: string;
  kind: "Industry" | "Research";
  /** One sentence used in overviews. */
  summary: string;
  highlights: { title: string; detail: string }[];
  projects?: string[];
};

export type Degree = {
  slug: string;
  level: "Undergraduate" | "Higher secondary" | "Secondary";
  degree: string;
  /** Subject or group, e.g. "Computer Science and Engineering" or "Science". */
  field: string;
  institution: string;
  location?: string;
  start?: string;
  end: string;
  details: string[];
  /** Grade point result, e.g. CGPA 3.84 out of 4.00. */
  result?: { label: string; value: string; scale: string };
  credits?: string;
  coursework: string[];
  thesis?: Maybe<{ title: string; kind: string; href?: string; summary?: string }>;
};

export type Referee = {
  name: string;
  title: string;
  department: string;
  institution: string;
  email: string;
};

export type AchievementCategory = "Conference" | "Competition";

export type CertificateImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type Achievement = {
  slug: string;
  title: string;
  /** What was actually achieved: "Fifth place", "Participant", "Paper presenter". */
  outcome: string;
  category: AchievementCategory;
  event: string;
  organizer: string;
  date: string;
  /** ISO date used for sorting. */
  sortDate: string;
  description: string;
  images: CertificateImage[];
  related?: { label: string; href: string };
};

export type SkillGroup = {
  name: string;
  description: string;
  skills: {
    name: string;
    /** Where the skill was used, linked to pages on this site. */
    evidence: { label: string; href: string }[];
  }[];
};

export type AcademicActivity = {
  slug: string;
  title: string;
  organization: Maybe<string>;
  period: Maybe<string>;
  description: Maybe<string>;
};

export type Article = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  href: string;
  venue: string;
};

export type NewsItem = {
  /** Shown as written, e.g. "Jun 2025" or "2026". */
  date: string;
  /** ISO date used only for ordering. */
  sortDate: string;
  text: string;
  href?: string;
  kind: "Publication" | "Talk" | "Award" | "Competition" | "Role" | "Education" | "Mentorship" | "Other";
};
