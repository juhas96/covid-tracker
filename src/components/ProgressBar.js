import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { subscriber } from "../services/loadingService";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 999999,
    color: "#fff",
  },
}));

export const ProgressBar = () => {
  const classes = useStyles();
  const [state, setState] = useState("");

  useEffect(() => {
    subscriber.subscribe((v) => {
      setState(v);
    });
  });

  return (
    <div>
      {state === "loading" ? (
        <Backdrop open={state === "loading"} className={classes.backdrop}>
          <CircularProgress style={{ zIndex: 999999999999 }} color="primary" />
        </Backdrop>
      ) : null}
    </div>
  );
};
