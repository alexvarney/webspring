import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

import Mappedin from "@mappedin/mappedin-js/builds/mappedin";

import Keys from "../../keys";
import Spinner from "../ui/spinner";
import MappedinMap from "./MappedinMapview";

import Markers from "./markers";

import {
  useSequentialSelections,
  useMarkerManager,
  getLocationForPolygon,
  getPolygonForLocation,
} from "./utils";

import {
  Wrapper,
  Row,
  LoadingScreen,
  StyledStatusBar,
  InterfaceContainer,
} from "./index.style";

const SelectionOrder = [
  "5b196e3b97e366793c000007",
  "5b1a811d97e366793c00007d",
  "5b1a821c97e366793c000084",
  "5b1a81f097e366793c000082",
  "5b1a81db97e366793c000081",
];

const MarkerLocations = [
  "5b198c5f97e366793c00004f",
  "5b1a81db97e366793c000081",
  "5b1a814f97e366793c00007f",
  "5b1a820697e366793c000083",
  "5b1a7fd897e366793c000079",
];

const markers = [
  {
    key: "demo-marker",
    location: "5b198c5f97e366793c00004f",
    component: <Markers.PinMarker />,
  },
  {
    key: "demo-marker-2",
    location: "5b1a81f097e366793c000082",
    component: <Markers.PinMarker />,
  },
  {
    key: "demo-marker-3",
    location: "5e41c9df2a268677540008d1",
    component: <Markers.PinMarker />,
  },
];

const OfficePasscode = "034611";
const HongweiOfficeID = "5b196e3b97e366793c000007";

export default function MapScreen() {
  const [isFullyLoaded, setFullyLoaded] = React.useState(false);
  const [selectedMap, setSelectedMap] = React.useState(null);
  const [sdkData, setSdkData] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [navigationNodes, setNavigationNodes] = React.useState([]);
  const history = useHistory();

  const markerManager = useMarkerManager(
    sdkData?.mapview,
    selectedMap,
    markers,
    isFullyLoaded
  );

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
      const location = getLocationForPolygon(polygonId, sdkData.mapview);

      sdkData.mapview.removeAllMarkers();
      sdkData.mapview.clearAllPolygonColors();
      sdkData.mapview.setPolygonColor(polygonId, 0xbf4320);
      setSelectedLocation(location.id);
      setSequentialLocations(location.id);
    },
    [sdkData, selectedMap]
  );

  //Respond to update of selected location
  React.useEffect(() => {
    console.log(selectedLocation);

    if (sdkData && sdkData.mapview && selectedLocation) {
      const polygon = getPolygonForLocation(selectedLocation, sdkData.mapview);

      switch (selectedLocation) {
        case "5b1a817c97e366793c000080":
          //Da Vinci

          const marker = sdkData.mapview.createMarker(
            "<div>Marker</div>",
            sdkData.mapview.getPositionPolygon(polygon),
            selectedMap,
            ""
          );

          ReactDOM.render(
            <Markers.LocationRedirectMarker
              text="Hello DaVinci"
              onActivate={() => {
                history.push("/2");
                sdkData.mapview.removeAllMarkers();
              }}
            />,
            marker.div
          );
      }
    }
  }, [selectedLocation, sdkData]);

  //Respond to update of sequential locations
  React.useEffect(() => {
    if (sdkData && sequentialLocations.length > 0) {
      sequentialLocations.forEach((locationID) => {
        const polygon = getPolygonForLocation(locationID, sdkData.mapview);

        if (polygon) {
          sdkData.mapview.setPolygonColor(polygon, 0xbf4320);
        }
      });

      if (sequentialLocations.length === SelectionOrder.length) {
        const officePolygon = getPolygonForLocation(
          HongweiOfficeID,
          sdkData.mapview
        );

        const marker = sdkData.mapview.createMarker(
          "<div>Marker</div>",
          sdkData.mapview.getPositionPolygon(officePolygon),
          selectedMap,
          ""
        );

        ReactDOM.render(
          <Markers.LockMarker
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
  }, [sequentialLocations, sdkData, selectedMap]);

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
    const polygon = getPolygonForLocation(e.target.value, sdkData.mapview);

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
