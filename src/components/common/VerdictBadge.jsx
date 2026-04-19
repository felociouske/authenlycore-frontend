import { verdictLabel } from "../../utils";

const classes = {
  scam: "badge-scam",
  legitimate: "badge-legitimate",
  suspicious: "badge-suspicious",
  unverified: "badge-unverified",
};

export default function VerdictBadge({ verdict }) {
  return (
    <span className={classes[verdict] || "badge-unverified"}>
      {verdictLabel(verdict)}
    </span>
  );
}