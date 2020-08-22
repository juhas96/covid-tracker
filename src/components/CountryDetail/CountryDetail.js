import React, { useEffect, useState } from "react";
import "./CountryDetail.css";
import Button from "@material-ui/core/Button";
import { dataService } from "../../stateService";
import InfoBox from "../InfoBox/InfoBox";
import { prettyPrintStat } from "../../util";
import numeral from "numeral";
import { subscriber } from "../../services/dataService";

function CountryDetail({ countryId }) {
  const [countryDetail, setCountryDetail] = useState({});

  useEffect(() => {
    subscriber.subscribe((res) => {
      setCountryDetail(res);
    });
  }, []);

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

      <div className="graph_row">
        <InfoBox
          className="infoBox"
          title="Total cases"
          color={"red"}
          active={true}
          cases={prettyPrintStat(countryDetail.todayCases)}
          total={numeral(countryDetail.cases).format("0.0a")}
        />

        <InfoBox
          className="infoBox"
          title="Active cases"
          color={"yellow"}
          active={true}
          cases={prettyPrintStat(countryDetail.todayCases)}
          total={numeral(countryDetail.active).format("0.0a")}
        />

        <InfoBox
          className="infoBox"
          title="Recovered"
          color={"green"}
          active={true}
          cases={prettyPrintStat(countryDetail.todayRecovered)}
          total={numeral(countryDetail.recovered).format("0.0a")}
        />

        <InfoBox
          className="infoBox"
          title="Deaths"
          color={"gray"}
          active={true}
          cases={prettyPrintStat(countryDetail.todayDeaths)}
          total={numeral(countryDetail.deaths).format("0.0a")}
        />
      </div>
    </div>
  );
}

export default CountryDetail;
