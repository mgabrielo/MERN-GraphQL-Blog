import { Styles } from "./homepage-styles";

export const headerStyles: Styles = {
  appBar: {
    bgcolor: "#404040",
    overflow: "hidden",
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
    borderRadius: 50,
    right: { xs: "65%", sm: "65%", md: "40%", lg: "40%" },
    paddingY: 1,
    ":hover": {
      bgcolor: "#fff",
      borderRadius: 10,
      cursor: "pointer",
      color: "#000",
    },
  },
};
