import { CSSProperties } from "react";
import { Styles } from "./homepage-styles";

export const addBlogStyle: Styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  blogHeader: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    fontWeight: "bold",
    padding: 3,
    alignItems: "center",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    mb: 7,
  },
};

export const htmlStyles: { [key: string]: CSSProperties } = {
  h2: {
    fontSize: "30px",
    fontFamily: "Work Sans",
    marginLeft: "50px",
    marginRight: "50px",
    marginTop: "30px",
    border: "2px solid #ccc",
  },
  p: {
    border: "2px solid #ccc",
    // outline: "none",
    marginLeft: "50px",
    marginRight: "50px",
    marginTop: "30px",
    fontFamily: "Work Sans",
    fontSize: "18px",
    textAlign: "start",
  },
};
