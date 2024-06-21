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
    justifyContent: {
      xs: "center",
      sm: "center",
      md: "flex-start",
      lg: "flex-start",
      xl: "flex-start",
    },
    gap: 2,
    flexWrap: "wrap",
    mx: { xs: 3, sm: 3, md: 10, lg: 12 },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    height: "50vh",
    cursor: "pointer",
    aspectRatio: 5 / 6,
    transition: "transform 1s",
    ":hover": {
      transform: "scale(1.02)",
      boxShadow: "10px 10px 20px #ccc",
    },
  },
  cardHeader: {
    fontFamily: "Work Sans",
    fontSize: "72px",
    height: "auto",
    minHeight: "30px",
    padding: 1,
  },
  cardContent: {
    width: "100%",
    height: "75%",
    fontSize: "20px",
    fontWeight: "500",
    backgroundColor: "#ccc",
  },
  title: {
    fontWeight: "600",
    m: 1,
    color: "white",
    textTransform: "capitalize",
    // textDecoration: "underline",
    maxWidth: "100%",
    display: "flex",
    flexWrap: "nowrap",
    textUnderlineOffset: "5px",
    fontFamily: "Work Sans",
    fontSize: {
      lg: 25,
      md: 22,
      sm: 20,
      xs: 18,
    },
  },
  contentText: {
    padding: 2,
    fontSize: "20px",
    fontWeight: "500",
    maxWidth: "100%",
  },
};
