import React from "react";
import styled from "styled-components";
import Mappedin from "@mappedin/mappedin-js/builds/mappedin";
import { motion } from "framer-motion";
import Transitions from "./ui/transitions";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: #fff;

  z-index: 1;
  padding: 0px;
  color: #fff;
`;

export default function MapView() {
  const [isVisible, setVisible] = React.useState(true);

  const wrapperRef = React.useRef(null);
  const [mapView, setMapView] = React.useState(null);

  const options = {
    mapview: {
      antialias: "AUTO", //auto apply antialiasing
      mode: Mappedin.modes.TEST, //automatically test for 3d or 2d mode
      onDataLoaded: () => console.log("data loaded"),
    },
    venue: {
      clientId: "",
      clientSecret: "",
      perspective: "Website", //pick the perspective you would like to load
      things: {
        //fetch some data
        venue: ["slug", "name"],
        maps: ["name", "elevation", "shortName"],
      },
      venue: "410-albert",
    },
  };

  React.useEffect(() => {
    Mappedin.initialize(options, wrapperRef.current).then((data) => {
      if (data?.mapview) {
        data.mapview.addInteractivePolygonsForAllLocations();

        data.mapview.onPolygonClicked = (data) =>
          console.log("polygon clicked", data);

        setMapView(data.mapview);
      }
    });
  }, []);

  React.useEffect(() => {
    console.log(mapView);
  }, [mapView]);

  return (
    <Wrapper
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      style={{ height: "100%" }}
      key="map-container"
    >
      <div style={{ height: "100%", maxHeight: "100%" }} ref={wrapperRef} />
    </Wrapper>
  );
}
