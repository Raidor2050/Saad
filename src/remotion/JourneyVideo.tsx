import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  useVideoConfig as useConfig,
} from "remotion";

const generations = [
  { gen: 0, name: "SaadMan Saif", year: "~2000", era: "Digital Age", subtitle: "The Investigation Begins" },
  { gen: 1, name: "AKM Saiful Islam", year: "~1970", era: "Modern Bangladesh", subtitle: "Father" },
  { gen: 2, name: "MD Abdul Mazid Talukder", year: "~1940", era: "Late Colonial Period", subtitle: "Grandfather" },
  { gen: 3, name: "MD Abul Hossain Talukder", year: "~1910", era: "British Raj", subtitle: "Great-Grandfather" },
  { gen: 4, name: "MD Ashraf Talukder", year: "~1880", era: "British Raj", subtitle: "Great-Great-Grandfather" },
  { gen: 5, name: "MD Eida Talukder", year: "~1850", era: "East India Company", subtitle: "Oldest Known Ancestor" },
];

const GenerationSlide: React.FC<{
  gen: typeof generations[0];
  index: number;
}> = ({ gen, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const slideUp = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: "clamp" });
  const scaleIn = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeIn,
      }}
    >
      <div style={{
        textAlign: "center",
        transform: `translateY(${slideUp}px) scale(${interpolate(scaleIn, [0, 1], [0.8, 1])})`,
        opacity: fadeIn,
      }}>
        <div style={{
          fontSize: 14,
          fontFamily: "monospace",
          color: "#996600",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom: 20,
        }}>
          GENERATION {gen.gen}
        </div>

        <div style={{
          fontSize: 80,
          fontFamily: "Georgia, serif",
          color: "#e0e0e0",
          fontWeight: 300,
          lineHeight: 1.1,
          marginBottom: 16,
        }}>
          {gen.name}
        </div>

        <div style={{
          fontSize: 18,
          fontFamily: "Georgia, serif",
          color: "#d4940a",
          marginBottom: 8,
        }}>
          {gen.subtitle}
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginTop: 24,
        }}>
          <span style={{
            fontSize: 16,
            fontFamily: "monospace",
            color: "#666666",
          }}>
            {gen.year}
          </span>
          <span style={{ color: "#333333" }}>·</span>
          <span style={{
            fontSize: 16,
            fontFamily: "monospace",
            color: "#666666",
          }}>
            {gen.era}
          </span>
        </div>

        {index === generations.length - 1 && (
          <div style={{
            marginTop: 40,
            padding: "8px 24px",
            border: "1px dashed #996600",
            borderRadius: 8,
            fontSize: 12,
            fontFamily: "monospace",
            color: "#d4940a",
          }}>
            DISCOVERY FRONTIER →
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const JourneyVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const introEnd = 45;
  const genDuration = 60;
  const outroStart = introEnd + generations.length * genDuration;

  const introOpacity = interpolate(frame, [0, 15, introEnd - 10, introEnd], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const outroOpacity = interpolate(
    frame,
    [outroStart, outroStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      <Sequence durationInFrames={introEnd}>
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: introOpacity,
            background: "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 12,
              fontFamily: "monospace",
              color: "#996600",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}>
              DEEP ANCESTRY INVESTIGATION
            </div>
            <div style={{
              fontSize: 64,
              fontFamily: "Georgia, serif",
              color: "#e0e0e0",
              fontWeight: 300,
            }}>
              How Far Back
            </div>
            <div style={{
              fontSize: 64,
              fontFamily: "Georgia, serif",
              color: "#d4940a",
              fontWeight: 400,
            }}>
              Can We Trace?
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {generations.map((gen, i) => (
        <Sequence
          key={gen.gen}
          from={introEnd + i * genDuration}
          durationInFrames={genDuration}
        >
          <GenerationSlide gen={gen} index={i} />
        </Sequence>
      ))}

      <Sequence from={outroStart}>
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: outroOpacity,
            background: "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 12,
              fontFamily: "monospace",
              color: "#996600",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}>
              THE INVESTIGATION CONTINUES
            </div>
            <div style={{
              fontSize: 48,
              fontFamily: "Georgia, serif",
              color: "#e0e0e0",
              fontWeight: 300,
              marginBottom: 16,
            }}>
              6 Generations · 233+ Years
            </div>
            <div style={{
              fontSize: 20,
              fontFamily: "Georgia, serif",
              color: "#d4940a",
            }}>
              And the research frontier remains open.
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
