import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CopyButton } from "@/components/copy-button";
import { CitationBox } from "@/components/citation-box";
import { PublicationExplorer } from "@/components/publication-explorer";
import { ProjectExplorer } from "@/components/project-explorer";
import { ThemeToggle } from "@/components/theme-toggle";
import { publications } from "@/content/publications";
import { projects } from "@/content/projects";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("CopyButton", () => {
  it("copies text and confirms", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    render(<CopyButton text="10.1109/NCIM65934.2025.11159848" label="Copy DOI" />);
    await userEvent.click(screen.getByRole("button", { name: /copy doi/i }));
    expect(writeText).toHaveBeenCalledWith("10.1109/NCIM65934.2025.11159848");
    expect(await screen.findByText("Copied")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Copied to clipboard");
  });

  it("says so when copying fails", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
      configurable: true,
    });
    render(<CopyButton text="x" label="Copy DOI" />);
    await userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/select the text instead/i)).toBeInTheDocument();
  });
});

describe("CitationBox", () => {
  it("switches formats with clicks and arrow keys", async () => {
    render(<CitationBox publication={publications[0]} />);
    const apa = screen.getByRole("tab", { name: "APA" });
    expect(apa).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Mahmud, S.");

    await userEvent.click(screen.getByRole("tab", { name: "BibTeX" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("@inproceedings");

    fireEvent.keyDown(screen.getByRole("tab", { name: "BibTeX" }), { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "APA" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "APA" })).toHaveFocus();
  });
});

describe("PublicationExplorer", () => {
  it("filters by year and shows an empty state with a reset", async () => {
    render(<PublicationExplorer publications={publications} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    const years = screen.getByRole("group", { name: "Year" });
    await userEvent.click(within(years).getByRole("button", { name: /2025/ }));
    expect(screen.getByRole("status")).toHaveTextContent("Showing 1 of 2 papers");
    expect(screen.getByRole("heading", { name: /Identifying Bangla Political Hate Speech/ })).toBeInTheDocument();

    await userEvent.type(screen.getByRole("searchbox", { name: "Search publications" }), "PoliticaNet");
    expect(await screen.findByText("No papers match these filters.")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByRole("status")).toHaveTextContent("2 papers");
  });
});

describe("ProjectExplorer", () => {
  it("filters by area and search", async () => {
    render(<ProjectExplorer projects={projects} />);
    const areas = screen.getByRole("group", { name: "Area" });
    await userEvent.click(within(areas).getByRole("button", { name: /Medical AI/ }));
    expect(screen.getByRole("status")).toHaveTextContent("Showing 1 of 3 projects");
    expect(within(areas).getByRole("button", { name: /Medical AI/ })).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(within(areas).getByRole("button", { name: "All" }));
    await userEvent.type(screen.getByRole("searchbox", { name: "Search projects" }), "onnx");
    expect(screen.getByRole("status")).toHaveTextContent("Showing 1 of 3 projects");
    expect(screen.getByRole("heading", { name: "UniSentix" })).toBeInTheDocument();
  });
});

describe("ThemeToggle", () => {
  it("switches the theme on <html> and remembers it", async () => {
    document.documentElement.removeAttribute("data-theme");
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: "Switch to dark theme" });
    await act(async () => {
      await userEvent.click(button);
    });
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeInTheDocument();
  });
});
