import { Styles } from "./homepage-styles";

export const profileStyles: Styles = {
  container: {
    display: "flex",
    flex: 1,
    height: "100%",
    padding: 0.5,
  },
  blogContainer: {
    flex: 0.8,
    flexDirection: "column",
    display: "flex",
    padding: 0.5,
    border: "1px solid #404040",
    height: "fit-content",
    overflow: "hidden",
  },
  cardContainer: {
    display: "flex",
    gap: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 2,
    height: "100%",
  },
  text: {
    fontFamily: "Work Sans",
    textAlign: "center",
  },
  profileContainer: {
    display: "flex",
    flex: 0.4,
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginX: "auto",
    position: "fixed",
    top: "10",
    bottom: "10",
    left: "20",
    right: "20",
    gap: 2,
    paddingX: 4,
  },
  avatar: {
    width: "80px",
    height: "80px",
    bg: "#404040",
  },
};
