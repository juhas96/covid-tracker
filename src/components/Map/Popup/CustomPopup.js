import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import Button from "@material-ui/core/Button";
import LineGraph from "../../LineGraph/LineGraph";
import Divider from "@material-ui/core/Divider";
import { dataService } from "../../../stateService";
import { countryData } from "../../../services/dataService";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

function CustomPopup({ data, casesType = "cases" }) {
  const handleStateChange = (e) => {
    countryData.send(e);
    dataService.send("detail");
  };

  const showDataOnMap = (data, casesType) =>
    data.map((country) => (
      <Circle
        key={country.name}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        fillOpacity={0.4}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            ></div>
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
            <Divider className="divider" />
            <div className="info-graph">
              <h4 className="info-graph_headline">Daily new cases</h4>
              <LineGraph
                casesType={casesType}
                worldWide={false}
                country={country.countryInfo.iso2}
              />
            </div>
            <div
              className="info-button"
              onClick={() => handleStateChange(country)}
            >
              <Button size="small" variant="contained">
                Show more info
              </Button>
            </div>
          </div>
        </Popup>
      </Circle>
    ));
  return <>{showDataOnMap(data, casesType)}</>;
}

export default CustomPopup;
