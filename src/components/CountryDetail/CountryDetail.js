import React, { useEffect, useState } from "react";
import "./CountryDetail.css";
import Button from "@material-ui/core/Button";
import { dataService } from "../../stateService";
import InfoBox from "../InfoBox/InfoBox";
import { prettyPrintStat } from "../../util";
import numeral from "numeral";
import { subscriber } from "../../services/dataService";
import LineGraph from "../../components/LineGraph/LineGraph";
import { isEmpty } from "../../util";
import { CardContent, Card } from "@material-ui/core";

function CountryDetail() {
  const [countryDetail, setCountryDetail] = useState({});

  useEffect(() => {
    subscriber.subscribe((res) => {
      setCountryDetail(res);
    });
  }, [countryDetail]);

  return (
    <>
      {!isEmpty(countryDetail) ? (
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

          <div className="infoBox_row">
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

          <div className="graph_row">
            <div className="infoBox">
              <Card>
                <CardContent>
                  <h4 className="graph_headline">Daily new cases</h4>
                  <LineGraph
                    daily={true}
                    casesType="cases"
                    worldWide={false}
                    country={countryDetail?.countryInfo?.iso2}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="infoBox">
              <Card>
                <CardContent>
                  <h4 className="graph_headline">Spread over time</h4>
                  <LineGraph
                    daily={false}
                    casesType="cases"
                    worldWide={false}
                    country={countryDetail?.countryInfo?.iso2}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="graph_row">
            <div className="infoBox">
              <Card>
                <CardContent>
                  <h4 className="graph_headline">Daily new deaths</h4>
                  <LineGraph
                    daily={true}
                    casesType="deaths"
                    worldWide={false}
                    country={countryDetail?.countryInfo?.iso2}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="infoBox">
              <Card>
                <CardContent>
                  <h4 className="graph_headline">Deaths over time</h4>
                  <LineGraph
                    daily={false}
                    casesType="deaths"
                    worldWide={false}
                    country={countryDetail?.countryInfo?.iso2}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default CountryDetail;
