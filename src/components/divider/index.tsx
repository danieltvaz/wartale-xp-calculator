import "./styles.css";

type Props = {
  margin?: string;
  width?: string;
};

export default function Divider({ margin, width }: Props) {
  return <div className="divider" style={{ margin: `${margin} 0px ${margin} 0px`, minWidth: width }}></div>;
}
