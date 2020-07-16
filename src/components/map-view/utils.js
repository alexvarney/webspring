import React from "react";
import ReactDOM from "react-dom";

export const getLocationForPolygon = (polygonId, mapview) => {
  return mapview.venue.locations.find((location) =>
    location.polygons.some((polygon) => polygon.id === polygonId)
  );
};

export const getPolygonForLocation = (locationId, mapview) => {
  return mapview.venue.locations.find((location) => location.id === locationId)
    .polygons[0];
};

export const useSequentialSelections = (order) => {
  /*
    Hook for validating a sequence of polygon clicks in a certain desired order. Returns an array containing the valid sequence of IDs that have been selected. Any attempt to add an ID that is not the next item in the sequence of IDs defined in `order` will result in the list of selected IDs being cleared.

    order: an array of Location IDs
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

export const useMarkerManager = (
  mapview,
  selectedMap,
  markers,
  fullyLoaded = false
) => {
  /* 
    Hook for managing a set of markers on a map. When we initialize a React component as a marker they end up in different stacking contexts making it difficult to control their layer order. This hook provides functionality to create an interactive marker with toggleable expansion state that automatically hides any other non-opened markers.

    Props: 
      mapview: the MapView3D object returned from Mappedin SDK
      selectedMap: ID of the current map
      markers: Array with configurations of markers -> { 
        (key): A unique key to identify the marker; 
        (location || polygon): Location or Polygon ID to pin the marker to; 
        (component): A React component to render 
      }
  */

  const [openLocation, setOpenLocation] = React.useState(null);
  const [activeMarkers, setActiveMarkers] = React.useState({});

  const onCloseHandler = (id) => {
    setOpenLocation(null);
  };

  const onOpenHandler = (id) => {
    setOpenLocation(id);
  };

  const createMarker = React.useCallback(
    (markerData) => {
      let polygon =
        markerData.polygon ??
        getPolygonForLocation(markerData.location, mapview);

      const marker = mapview.createMarker(
        "<div>Marker</div>",
        mapview.getPositionPolygon(polygon),
        selectedMap,
        ""
      );

      const clonedElement = React.cloneElement(markerData.component, {
        onOpen: onOpenHandler,
        onClose: onCloseHandler,
        id: markerData.key,
      });

      setActiveMarkers((prevState) => {
        prevState[markerData.key] = {
          key: markerData.key,
          mappedinMarker: marker,
          reactElement: clonedElement,
        };
        return prevState;
      });

      ReactDOM.render(clonedElement, marker.div);
    },
    [mapview, selectedMap]
  );

  const removeMarker = React.useCallback(
    (markerData) => {
      mapview.removeMarker(markerData.mappedinMarker);
      setActiveMarkers((prevState) => {
        delete prevState[markerData.key];
        return prevState;
      });
    },
    [mapview, setActiveMarkers]
  );

  //Determine which markers to show and hide
  React.useEffect(() => {
    if (fullyLoaded && mapview && selectedMap && markers) {
      if (openLocation) {
        markers.forEach((details) => {
          if (details.key !== openLocation) {
            removeMarker(activeMarkers[details.key]);
          }
        });
      } else {
        markers.forEach((details) => {
          if (!activeMarkers[details.key]) {
            createMarker(details);
          }
        });
      }
    }
  }, [
    mapview,
    selectedMap,
    markers,
    fullyLoaded,
    openLocation,
    createMarker,
    removeMarker,
    activeMarkers,
  ]);
};
