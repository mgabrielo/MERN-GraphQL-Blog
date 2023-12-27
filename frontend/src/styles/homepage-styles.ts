import { SxProps } from "@mui/material";

export type Styles = {
  [key: string]: SxProps;
};

export const homepageStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 6,
    gap: 10,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  text: {
    fontFamily: "Work Sans",
    fontWeight: "500",
    textShadow: "12px 10px 8px #ccc",
    fontSize: { lg: 50, md: 40, sm: 35, xs: 20 },
  },
  image: {
    boxShadow: "10px 10px 25px #000",
    borderRadius: 20,
  },
  footerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "20vh",
    gap: 20,
    bgcolor: "#404040",
    width: "100%",
  },
  footerButton: {
    bgcolor: "blueviolet",
    width: 200,
    textTransform: "capitalize",
    borderRadius: 10,
    ":hover": {
      bgcolor: "#bd63fa",
      color: "#000",
      textTransform: "capitalize",
    },
  },
  footerText: {
    fontFamily: "Work Sans",
    fontWeight: "500",
    fontSize: 20,
    color: "white",
  },
};
