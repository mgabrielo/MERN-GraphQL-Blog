import { Styles } from "./homepage-styles";

const colors = [
  "#FF9800",
  "#FF5722",
  "#60DB8B",
  "#4CAF50",
  "#8BC34A",
  "#40C4FF",
  "#0277BD",
  "#4DB6AC",
  "#009688",
  "#448AFF",
  "#42A5F5",
  "#7C5732",
  "#D32F2F",
  "#AB47BC",
];

export function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
export const bloglistStyles: Styles = {
  container: {
    display: "flex",
    justifyContent: "flex-start",
    gap: 2,
    flexWrap: "wrap",
    m: 3,
  },
  card: {
    width: "450px",
    display: "flex",
    flexDirection: "column",
    height: "70vh",
    transition: "transform 1s",
    ":hover": {
      transform: "scale(1.02)",
      boxShadow: "10px 10px 20px #ccc",
    },
  },
  cardHeader: {
    fontFamily: "Work Sans",
    fontSize: "72px",
    height: "35%",
    padding: 1,
  },
  cardContent: {
    width: "100%",
    height: "75%",
    fontSize: "20px",
    fontWeight: "500",
  },
  title: {
    fontWeight: "600",
    m: 1,
    color: "white",
    textTransform: "uppercase",
    textDecoration: "underline",
    textUnderlineOffset: "5px",
    fontFamily: "Work Sans",
    textShadow: "2px 7px 10px #808080",
  },
  contentText: {
    padding: 2,
    fontSize: "20px",
    fontWeight: "500",
  },
};
