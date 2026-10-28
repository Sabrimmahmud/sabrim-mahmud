"""Renders the CV HTML written by build-cv.mts to PDF with WeasyPrint (tagged PDF/UA-1).

    python3 scripts/render-cv.py public    -> public/cv/*.pdf
    python3 scripts/render-cv.py private   -> private-cv/*.pdf (with references)

Run through `npm run cv:weasyprint` or `npm run cv:private`, which write the HTML first.
"""
import sys
from pathlib import Path

import weasyprint

variant = sys.argv[1] if len(sys.argv) > 1 else "public"
root = Path(__file__).resolve().parent.parent
build = root / "scripts" / ".cv-build" / variant
out = root / ("private-cv" if variant == "private" else "public/cv")
out.mkdir(parents=True, exist_ok=True)

footer = weasyprint.CSS(
    string="""
    @page {
      @bottom-left { content: "Sabrim Mahmud"; font: 7pt "Instrument Sans"; color: #626b7d; }
      @bottom-right { content: counter(page) " of " counter(pages); font: 7pt "Instrument Sans"; color: #626b7d; }
    }
    """
)

for html in sorted(build.glob("*.html")):
    target = out / f"{html.stem}.pdf"
    weasyprint.HTML(filename=str(html)).write_pdf(str(target), stylesheets=[footer], pdf_variant="pdf/ua-1")
    print(f"Wrote {target.relative_to(root)}")
