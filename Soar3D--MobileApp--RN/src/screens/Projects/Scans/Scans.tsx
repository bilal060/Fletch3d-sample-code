import { useRoute } from "@react-navigation/native";
import useThemeImages from "assets/images";
import { useCallback, useMemo } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScansRouteProp } from "shared/navigators/ProjectStackNavigator";
import { IMyScansList } from "shared/types/myScans/myScans.type";
import useScans from "./useScans";
import ScanDetails from "shared/components/Scans/ScanDetails";

const Scans = (): JSX.Element => {
  const {
    params: { activeScanId, scans, activeRoute },
  } = useRoute<ScansRouteProp>();
  const {
    activeIndex,
    bottomNavigation,
    onViewCallBack,
    viewConfigRef,
    handleGoBack,
    viewModel,
    handleDeleteScan,
    myScans,
  } = useScans(scans);
  const { top, bottom } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const { LibraryOverLayFrame } = useThemeImages();
  const initialItemIndex = scans.findIndex((item) => item._id === activeScanId);

  const defaultProps = useMemo(
    () => ({
      LibraryOverLayFrame: LibraryOverLayFrame,
      top,
      bottom,
      width,
      height,
      bottomNavigation,
      activeIconName: activeRoute,
      // bottomSheet,
      // showScanDetails,
    }),
    []
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IMyScansList; index: number }) => (
      <ScanDetails
        {...item}
        defaultProps={defaultProps}
        activeIndex={activeIndex}
        currentIndex={index}
        handleGoBack={handleGoBack}
        handleViewModel={viewModel}
        handleDelete={handleDeleteScan}
      />
    ),
    [activeIndex]
  );

  return (
    <View style={styles.root}>
      <StatusBar hidden={true} />
      <FlatList
        data={myScans}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        onViewableItemsChanged={onViewCallBack}
        viewabilityConfig={viewConfigRef.current}
        initialScrollIndex={initialItemIndex}
        getItemLayout={(_, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        extraData={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Scans;
