import { Styles } from "./homepage-styles";

export const headerStyles: Styles = {
  appBar: {
    position: "sticky",
    bgcolor: "#404040",
  },
  tabContainer: {
    width: "100%",
    marginLeft: "auto",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  authBtn: {
    ml: 2,
    bgColor: "#d27e20",
    color: "#fff",
    width: 90,
    borderRadius: 20,
    ":hover": {
      bgcolor: "#ff9400",
    },
  },
  addLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    color: "#000",
    position: "absolute",
    bgcolor: "#fff",
    borderRadius: 10,
    right: "40%",
    width: "30%",
    paddingY: 1,
    ":hover": {
      bgcolor: "rgba(0,0,0,0.5)",
      borderRadius: 10,
      cursor: "pointer",
      color: "#fff",
    },
  },
};
