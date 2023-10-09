import { View, useWindowDimensions } from "react-native";
import Mapbox from "@rnmapbox/maps";
import { MAPBOX_ACCESS_TOKEN } from "@env";
import { useState } from "react";
import { LocationPin } from "assets/icons";
import { MapPin } from "react-native-feather";

const MapViewScreen = (): JSX.Element => {
  Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
  const [pinCoordinate, setPinCoordinate] = useState(undefined);

  const { width, height } = useWindowDimensions();

  const onPinPress = (event: any) => {
    console.log(event);
    // const coordinate = event.nativeEvent.coordinate;
    // setPinCoordinate(coordinate);
  };

  return (
    <Mapbox.MapView
      style={{ width, height }}
      // onLocationChanged={setLocation}
    >
      <Mapbox.UserLocation
        // id="user-location"
        // coordinate={location}
        visible={true}
      />
      <Mapbox.PointAnnotation
        id="point-annotation"
        coordinate={[40, 40]}
        draggable={true}
        onDragEnd={onPinPress}
      >
        <MapPin fill="red" color="#fff" width={40} height={40} />
      </Mapbox.PointAnnotation>
    </Mapbox.MapView>
  );
};

export default MapViewScreen;
