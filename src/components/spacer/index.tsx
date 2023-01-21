import "./styles.css";

type SpacerProps = {
  orientation: "vertical" | "horizontal";
};

export default function Spacer({ orientation }: SpacerProps) {
  return <div className={`spacer--${orientation}`}></div>;
}
