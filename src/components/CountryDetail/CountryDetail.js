import React from "react";
import "./CountryDetail.css";
import Button from "@material-ui/core/Button";
import { dataService } from "../../stateService";

function CountryDetail() {
  return (
    <div className="detail">
      <div className="button_row">
        <Button
          onClick={() => dataService.send("map")}
          size="small"
          variant="contained"
        >
          Back to map
        </Button>
      </div>
    </div>
  );
}

export default CountryDetail;
