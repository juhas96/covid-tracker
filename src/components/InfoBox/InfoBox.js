import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ color, title, cases, total, active, isRed, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox 
        ${active && "infoBox--selected"}
        ${color === "red" && "infoBox--red"}
        ${color === "yellow" && "infoBox--yellow"}
        ${color === "green" && "infoBox--green"}
        ${color === "gray" && "infoBox--gray"}
      `}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2
          className={`infoBox_cases
          ${color === "red" && "infoBox_cases--red"}
          ${color === "green" && "infoBox_cases--green"}
          ${color === "yellow" && "infoBox_cases--yellow"}
          ${color === "grey" && "infoBox_cases--grey"}
        `}
        >
          {cases}
        </h2>

        <Typography className="infoBox_total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
