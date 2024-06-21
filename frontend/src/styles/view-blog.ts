import { Styles } from "./homepage-styles";

export const viewBlogStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 2,
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    padding: 1,
  },
  headerText: {
    fontFamily: "Arvo",
    fontSize: "18px",
    textTransform: "capitalize",
  },
  profileHeaderItems: {
    display: "flex",
    alignItems: "center",
    py: 1,
    gap: 2,
  },
  blogTitle: {
    fontSize: "30px",
    textAlign: "center",
    fontFamily: "Arvo",
    fontWeight: "700",
    textTransform: "capitalize",
  },
  blogContent: {
    padding: 5,
    fontSize: "20px",
    textAlign: "justify",
    fontFamily: "Work Sans",
  },
  commentBox: {
    padding: 2,
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  commentInputContainer: {
    padding: 2,
  },
  inputLayout: {
    display: "flex",
    gap: 2,
    py: 2,
    alignItems: "center",
  },
  textField: {
    width: "100%",
    borderRadius: "20px",
  },
  comments: {
    display: "flex",
    flexDirection: "column",
  },
  commentItem: {
    display: "flex",
    padding: 1,
    alignItems: "center",
    gap: 1,
    margin: 1,
    borderBottom: "1px solid #000",
    borderBottomWidth: 1,
    height: "auto",
  },
  commentText: {
    margin: 2,
    fontWeight: "600",
    fontSize: "15px",
    fontFamily: "Arvo",
  },
};
