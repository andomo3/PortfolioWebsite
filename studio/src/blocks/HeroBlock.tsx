import type { HeroProps } from "../types/layout";

type Props = { props: HeroProps };

export default function HeroBlock({ props }: Props) {
  const body = props.body ?? props.subtitle;

  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16, background: "#fff" }}>
      {props.kicker && (
        <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.6 }}>
          {props.kicker}
        </div>
      )}
      <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>{props.title}</div>
      {body && <div style={{ opacity: 0.75, marginTop: 8 }}>{body}</div>}
      {props.pills && props.pills.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {props.pills.map((pill, index) => (
            <span
              key={index}
              style={{
                border: "1px solid rgba(0,0,0,0.10)",
                borderRadius: 999,
                padding: "6px 10px",
                fontSize: 13,
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12, fontSize: 12, opacity: 0.7 }}>
        {props.ctaPrimary?.label && <span>Primary: {props.ctaPrimary.label}</span>}
        {props.ctaSecondary?.label && <span>Secondary: {props.ctaSecondary.label}</span>}
      </div>
      {props.mediaUrl || props.mediaAssetId ? (
        <div style={{ marginTop: 12, padding: 10, borderRadius: 12, background: "rgba(0,0,0,0.02)", fontSize: 12 }}>
          Media: {props.mediaAssetId ? `Asset ${props.mediaAssetId}` : props.mediaUrl}
        </div>
      ) : null}
    </div>
  );
}
