import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RefObject } from "react";
import { ImageSourcePropType } from "react-native";
import { BottomTabRoutes } from "shared/navigators/BottomStack";

export interface IPostDefaultProps {
  width: number;
  height: number;
  top: number;
  bottom: number;
  LibraryOverLayFrame: ImageSourcePropType;
  bottomNavigation: (screen: string) => void;
  // bottomSheet: RefObject<BottomSheetModal>;
  // showScanDetails: () => void;
  activeIconName: string;
}
