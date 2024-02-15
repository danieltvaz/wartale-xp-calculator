import "./styles.css";

type SpacerProps = {
  orientation: "vertical" | "horizontal";
  size?: string;
};

export default function Spacer({ orientation, size }: SpacerProps) {
  return (
    <div
      className={`spacer--${orientation}`}
      style={{
        width: orientation === "vertical" ? undefined : size,
        height: orientation === "vertical" ? size : undefined,
      }}></div>
  );
}
