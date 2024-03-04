import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  ownMessage: {
    textAlign: "right",
    alignItems: "flex-end",
    marginRight: theme.spacing(2),
    marginLeft: "auto",
    backgroundColor: "#e0211a",
    color: theme.palette.primary.contrastText,
    "& $messageAuthor": {
      right: "5px",
      left: "auto",
    },
  },

  ownMessageTime: {
    color: "lightgrey",
  },

  input: {
    backgroundColor: "#eee",
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderRadius: "50px",
  },
}));

export default useStyles;
