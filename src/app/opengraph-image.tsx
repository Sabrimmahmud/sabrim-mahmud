import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const alt = `${profile.name}, AI systems developer and NLP researcher`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#13213a",
          color: "#eeece5",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, letterSpacing: -2, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ fontSize: 34, marginTop: 28, color: "#b9c2cf" }}>
            AI systems developer, NLP researcher and software engineer
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", borderTop: "2px solid #2c3b57", paddingTop: 28 }}>
          <div style={{ fontSize: 30, color: "#9cc8ae" }}>Multilingual NLP for Bangla, Banglish and English</div>
          <div style={{ fontSize: 24, marginTop: 10, color: "#b9c2cf" }}>
            Political hate speech detection, sentiment systems, efficient inference
          </div>
        </div>
      </div>
    ),
    size,
  );
}
