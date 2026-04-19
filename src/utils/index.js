import { format, formatDistanceToNow } from "date-fns";

export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return format(new Date(dateStr), "MMM d, yyyy");
};

export const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
};

export const truncate = (text, length = 200) => {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
};

export const verdictLabel = (verdict) => {
  const map = {
    scam: "SCAM",
    legitimate: "LEGIT",
    suspicious: "SUSPICIOUS",
    unverified: "UNVERIFIED",
  };
  return map[verdict] || verdict;
};

export const categoryLabel = (category) => {
  const map = {
    mlm: "MLM / Network Marketing",
    crypto: "Crypto / Investment",
    survey: "Survey / GPT",
    freelance: "Freelance",
    forex: "Forex / Trading",
    dropship: "Dropshipping",
    app: "App / Mobile",
    other: "Other",
  };
  return map[category] || category;
};

export const formatNumber = (n) => {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
};