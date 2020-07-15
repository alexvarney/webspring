import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Mappedin from "@mappedin/mappedin-js/builds/mappedin";
import { motion } from "framer-motion";
import StatusBar from "../ui/statusbar";
import Keys from "../../keys";
import Spinner from "../ui/spinner";
import MappedinMap from "./MappedinMapview";
import LockMarker from "./LockMarker";

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
  background-color: #bf4320;
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
  max-width: 100%;
  overflow: hidden;
  z-index: 10;
  padding: 4px;
  background-color: #1f4e6e;
  align-self: end;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const SelectionOrder = [
  "5b196e3b97e366793c000007",
  "5b1a811d97e366793c00007d",
  "5b1a821c97e366793c000084",
  "5b1a81f097e366793c000082",
  "5b1a81db97e366793c000081",
];

const OfficePasscode = "034611";
const HongweiOfficeID = "5b196e3b97e366793c000007";

const useSequentialSelections = (order) => {
  /*
    Hook for validating a sequence of polygon clicks in a certain desired order.
    Returns an array containing the valid sequence of IDs that have been selected.
    Any attempt to add an ID that is not the next sequential ID in the provided order 
    prop will result in the list of selected IDs being cleared.

    order: a list of Location IDs
  */

  const [selectedLocations, setSelectedLocations] = React.useState([]);

  const handlePolygonClick = (polygonID) => {
    setSelectedLocations((prevLocations) => {
      const index = prevLocations.length;

      if (order[index] === polygonID) {
        return [...prevLocations, polygonID];
      } else if (polygonID === order[0]) {
        return [polygonID];
      }

      return [];
    });
  };

  return [selectedLocations, handlePolygonClick];
};

export default function MapScreen() {
  const [isFullyLoaded, setFullyLoaded] = React.useState(false);
  const [selectedMap, setSelectedMap] = React.useState(null);
  const [sdkData, setSdkData] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [navigationNodes, setNavigationNodes] = React.useState([]);

  const [sequentialLocations, setSequentialLocations] = useSequentialSelections(
    SelectionOrder
  );

  const options = {
    mapview: {
      antialias: "AUTO", //auto apply antialiasing
      mode: Mappedin.modes.TEST, //automatically test for 3d or 2d mode
      onDataLoaded: () => console.log("Data loaded"),
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
      venue: "410-albert",
    },
  };

  const levels = sdkData?.mapview?.venue?.maps.sort(
    (a, b) => b.elevation - a.elevation
  );

  const locations = sdkData?.mapview.venue.locations
    .filter((item) => item.polygons && item.polygons.length > 0)
    .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

  const loadingCallback = (data) => {
    setSdkData(data);
    setSelectedMap(data.mapview.currentMap);

    data.mapview.addInteractivePolygonsForAllLocations();
    data.mapview.labelAllLocations();
  };

  const addNavigationNode = (node) => {
    const { mapview: mapView } = sdkData;

    setNavigationNodes((prevVal) => {
      if (prevVal[0]) {
        prevVal[0].directionsTo(
          node,
          { accessible: false, directionsProvider: "offline" },
          function (error, directions) {
            if (error || directions.path.length == 0) {
              // Some kind of network error, or those two points aren't connected, or are invalid
              return;
            }

            mapView.clearAllPolygonColors();

            if (node?.polygons) {
              mapView.setPolygonColor(node.polygons[0], 0xbf4320);
            } else {
              mapView.setPolygonColor(node, 0xbf4320);
            }

            if (prevVal[0].polygons) {
              mapView.setPolygonColor(prevVal[0].polygons[0], 0xbf4320);
            } else {
              mapView.setPolygonColor(prevVal[0], 0xbf4320);
            }

            mapView.removeAllPaths();
            mapView.drawPath(directions.path);
            mapView.focusOnPath(
              directions.path,
              [node, prevVal[0]],
              true,
              2000
            );
          }
        );

        return [node, prevVal[0]];
      }
      return [node];
    });
  };

  const onPolygonClicked = React.useCallback(
    (polygonId) => {
      const location = sdkData.mapview.venue.locations.find((location) =>
        location.polygons.some((polygon) => polygon.id === polygonId)
      );

      sdkData.mapview.removeAllMarkers();
      sdkData.mapview.clearAllPolygonColors();
      sdkData.mapview.setPolygonColor(polygonId, 0xbf4320);

      setSequentialLocations(location.id);

      // addNavigationNode(location);
    },
    [sdkData, selectedMap]
  );

  React.useEffect(() => {
    if (sdkData && sequentialLocations.length > 0) {
      sequentialLocations.forEach((locationID) => {
        const polygon = sdkData.mapview.venue.locations.find(
          (location) => location.id === locationID
        ).polygons[0];

        if (polygon) {
          sdkData.mapview.setPolygonColor(polygon, 0xbf4320);
        }
      });

      if (sequentialLocations.length === SelectionOrder.length) {
        const officePolygon = sdkData.mapview.venue.locations.find(
          (location) => location.id === HongweiOfficeID
        ).polygons[0];

        const marker = sdkData.mapview.createMarker(
          "<div>Marker</div>",
          sdkData.mapview.getPositionPolygon(officePolygon),
          selectedMap,
          ""
        );

        ReactDOM.render(
          <LockMarker
            passcode={OfficePasscode}
            onClose={() => {
              sdkData.mapview.removeAllMarkers();
            }}
            onSuccess={() => {
              sdkData.mapview.removeAllMarkers();
              sdkData.mapview.clearAllPolygonColors();
              alert("code success");
            }}
          />,
          marker.div
        );
      }
    }
  }, [sequentialLocations, sdkData]);

  //Avoid a stale closure by wrapping the function assignment in a useEffect and callback function in useCallback
  React.useEffect(() => {
    if (sdkData && sdkData.mapview) {
      sdkData.mapview.onPolygonClicked = onPolygonClicked;
    }
  }, [sdkData, onPolygonClicked]);

  const onLevelChange = (e) => {
    setSelectedMap(e.target.value);
  };

  const onLocationChange = (e) => {
    const polygon = sdkData.mapview.venue.locations.find(
      (location) => location.id === e.target.value
    ).polygons[0];

    if (polygon) {
      //setNavigationNodes([polygon]);
      sdkData.mapview.removeAllPaths();
      sdkData.mapview.clearAllPolygonColors();
      sdkData.mapview.setPolygonColor(polygon, 0xbf4320);

      if (polygon.map !== selectedMap) {
        setSelectedMap(polygon.map);
        setTimeout(() => {
          sdkData.mapview.focusOnPolygon(polygon);
        }, 100);
      } else {
        sdkData.mapview.focusOnPolygon(polygon);
      }
    }

    setSelectedLocation(e.target.value);
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
        <Row>
          <p>Location: </p>
          <select
            key={selectedLocation || ""}
            value={selectedLocation || ""}
            onChange={onLocationChange}
          >
            {locations?.map((location) => (
              <option value={location.id} key={location.id}>
                {location.name}
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
