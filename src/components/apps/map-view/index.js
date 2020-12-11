import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

import Mappedin from "@mappedin/mappedin-js/builds/mappedin";

import Keys from "../../../keys";
import Spinner from "../../shared/spinner";
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
  "5b1a820697e366793c000083", //ptolemy
  "5b1a81db97e366793c000081", //mercator
  "5b1a817c97e366793c000080", //da vinci
  "5b1a814f97e366793c00007f", //tomlinson
  "5b1a821c97e366793c000084", //massey
  "5b1a81f097e366793c000082" //ortelius
];

//5f529bb1b20a327b7a000001 values wall
//5f529c43b20a327b7a00000d pet wall
//5b1a84ed97e366793c000091 server room
//5b196e3b97e366793c000007 hongwei's office

const OfficePasscode = "034611";
const HongweiOfficeID = "5b196e3b97e366793c000007";

export default function MapScreen() {
  const [isFullyLoaded, setFullyLoaded] = React.useState(false);
  const [selectedMap, setSelectedMap] = React.useState(null);
  const [sdkData, setSdkData] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [navigationNodes, setNavigationNodes] = React.useState([]);

  const history = useHistory();

  const markers = [
    {
      key: "values-wall",
      location: "5f529bb1b20a327b7a000001",
      component: (
        <Markers.LocationRedirectMarker
          onActivate={() => {
            history.push("values_wall");
          }}
        />
      ),
    },
    {
      key: "pet-wall",
      location: "5f529c43b20a327b7a00000d",
      component: (
        <Markers.LocationRedirectMarker
          onActivate={() => {
            history.push("pet_wall");
          }}
        />
      ),
    },
    {
      key: "server-room",
      location: "5b1a84ed97e366793c000091",
      component: (
        <Markers.LocationRedirectMarker
          onActivate={() => {
            history.push("server_room");
          }}
        />
      ),
    },
    {
      key: "bookcase",
      location: "5b1a834697e366793c000087",
      component: (
        <Markers.LocationRedirectMarker
          onActivate={() => {
            history.push("bookcase");
          }}
        />
      ),
    },
    {
      key: "fantasy-wall",
      location: "5fd2799106d5276c37000000",
      component: (
        <Markers.LocationRedirectMarker
          onActivate={() => {
            history.push("fantasy_wall");
          }}
        />
      ),
    },
  ];

  const { resetMarkers, addMarker, deleteMarker } = useMarkerManager(
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

      sdkData.mapview.clearAllPolygonColors();
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

          const markerComponent = (
            <Markers.LocationRedirectMarker
              text="Hello DaVinci"
              onActivate={() => {
                history.push("/2");
                deleteMarker("da-vinci-marker");
              }}
            />
          );

          addMarker({
            key: "da-vinci-marker",
            location: "5b1a817c97e366793c000080",
            component: markerComponent,
          });
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
        addMarker({
          key: "lock-marker",
          location: HongweiOfficeID,
          component: (
            <Markers.LockMarker
              passcode={OfficePasscode}
              onCloseAction={() => {
                deleteMarker("lock-marker");
                resetMarkers();
              }}
              onSuccess={() => {
                deleteMarker("lock-marker");
                resetMarkers();
              }}
            />
          ),
        });
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
    <Wrapper key="map-container">
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
