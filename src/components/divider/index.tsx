import "./styles.css";

type Props = {
  margin?: string;
};

export default function Divider({ margin }: Props) {
  return <div className="divider" style={{ margin: `${margin} 0px ${margin} 0px` }}></div>;
}
