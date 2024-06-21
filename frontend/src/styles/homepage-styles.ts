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
    flexDirection: {
      xs: "column",
      sm: "column",
      md: "row",
      lg: "row",
      xl: "row",
    },
    alignItems: "center",
    justifyContent: "center",
    minHeight: { xs: "10vh", sm: "10vh", md: "20vh" },
    paddingX: 2,
    paddingY: 5,
    mt: 5,
    gap: { xs: 5, sm: 5, md: 12, lg: 15, xl: 20 },
    bgcolor: "#404040",
    width: "auto",
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
