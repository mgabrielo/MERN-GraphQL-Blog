import { Styles } from "./homepage-styles";

export const authStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    m: "auto",
    height: "75vh",
  },
  logoTitle: {
    display: "flex",
    gap: 1,
    alignItems: "center",
    justifyContent: "center",
    mt: 1,
    mb: 1,
  },
  logoText: {
    fontFamily: "Work Sans",
    fontSize: "30px",
    fontWeight: "500",
  },
  formContainer: {
    border: "1px solid #ccc",
    borderRadius: 5,
    padding: 5,
    textAlign: "center",
    boxShadow: "5px 5px 10px #000",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 4,
  },
  submitBtn: {
    width: "200px",
    fontFamily: "Work Sans",
    mt: 1,
    borderRadius: 10,
    mx: "auto",
    color: "white",
    bgcolor: "#808080",
    ":hover": {
      color: "#000",
      bgcolor: "#ccc",
      boxShadow: "10px 10px 20px #ccc",
    },
  },
};
