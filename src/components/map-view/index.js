import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Mappedin from "@mappedin/mappedin-js/builds/mappedin";
import { motion } from "framer-motion";
import StatusBar from "../ui/statusbar";
import Keys from "../../keys";
import Spinner from "../ui/spinner";
import MappedinMap from "./MappedinMapview";
import TestComponent from "./TestComponent";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  background: #fff;
  position: relative;

  z-index: 1;
  padding: 0px;
  color: #fff;
  display: grid;
  grid-template: 1fr / 1fr;

  & > * {
    grid-column: 1;
    grid-row: 1;
  }
`;

const Row = styled.div`
  display: flex;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

const LoadingScreen = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #1f4e6e;
  z-index: 100;
`;

const StyledStatusBar = styled(StatusBar)`
  position: absolute;
  top: 0;
  background-color: rgb(40, 40, 40);
  border-bottom: 1px solid rgb(100, 100, 100);
  box-shadow: 2px 0px 4px rgba(40, 40, 40, 0.75);
  color: white;
  z-index: 1000;
`;

const InterfaceContainer = styled.div`
  height: 10%;
  max-height: 10%;
  width: 100%;
  z-index: 10;
  padding: 4px;
  background-color: #1f4e6e;
  align-self: end;
  display: flex;
  align-items: center;
`;

export default function MapScreen() {
  const [isFullyLoaded, setFullyLoaded] = React.useState(false);
  const [selectedMap, setSelectedMap] = React.useState(null);
  const [sdkData, setSdkData] = React.useState(null);

  const options = {
    mapview: {
      antialias: "AUTO", //auto apply antialiasing
      mode: Mappedin.modes.TEST, //automatically test for 3d or 2d mode
      onDataLoaded: () => console.log("data loaded"),
      onFirstMapLoaded: () => {
        setFullyLoaded(true);
        console.log("fully loaded");
      },
    },
    venue: {
      ...Keys,
      perspective: "Website", //pick the perspective you would like to load
      things: {
        //fetch some data
        venue: ["slug", "name"],
        maps: ["name", "elevation", "shortName"],
      },
      venue: "toronto-eaton-centre",
    },
  };

  const onPolygonClicked = React.useCallback(
    (polygonId) => {
      console.log(polygonId);

      sdkData.mapview.setPolygonColor(polygonId, 0xff0000);

      const marker = sdkData.mapview.createMarker(
        "<div>React stuff here?</div>",
        sdkData.mapview.getPositionPolygon(polygonId),
        selectedMap,
        ""
      );

      ReactDOM.render(<TestComponent message="test" />, marker.div);
    },
    [sdkData]
  );

  const loadingCallback = (data) => {
    setSdkData(data);
    setSelectedMap(data.mapview.currentMap);

    data.mapview.addInteractivePolygonsForAllLocations();
    data.mapview.labelAllLocations();
  };

  //Avoid a stale closure by wrapping the function assignment in a useEffect and callback function in useCallback

  React.useEffect(() => {
    if (sdkData && sdkData.mapview) {
      sdkData.mapview.onPolygonClicked = onPolygonClicked;
    }
  }, [sdkData, onPolygonClicked]);

  const levels = sdkData?.mapview?.venue?.maps.sort(
    (a, b) => b.elevation - a.elevation
  );

  const onLevelChange = (e) => {
    setSelectedMap(e.target.value);
  };

  return (
    <Wrapper
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      key="map-container"
    >
      <StyledStatusBar />
      {!isFullyLoaded && (
        <LoadingScreen>
          <Spinner />
        </LoadingScreen>
      )}

      <InterfaceContainer>
        <Row>
          <p>Floor: </p>
          <select
            key={selectedMap}
            value={selectedMap}
            onChange={onLevelChange}
          >
            {levels?.map((level) => (
              <option value={level.id} key={level.id}>
                {level.shortName}
              </option>
            ))}
          </select>
        </Row>
      </InterfaceContainer>

      <MappedinMap
        selectedMap={selectedMap}
        options={options}
        onLoad={loadingCallback}
      />
    </Wrapper>
  );
}
