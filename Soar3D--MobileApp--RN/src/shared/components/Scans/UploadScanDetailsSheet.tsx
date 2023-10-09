import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { Text, IconButton } from "../ui";
import { ArrowRight } from "react-native-feather";
import { Dispatch, RefObject, SetStateAction, forwardRef } from "react";
import IconInput from "../ui/IconInput";
import { IUploadScanDetails } from "shared/types/scans/scans.type";
import { FolderOutline, LocationPin, VideoCameraOutline } from "assets/icons";
import { ISelectMenuList } from "shared/types/utils/utils.type";
import DropDownModal from "../ui/DropDownModal";

interface UploadScanDetailsSheetProps
  extends Omit<BottomSheetProps, "children"> {
  bottomSheetModalRef: RefObject<BottomSheet>;
  onChangeText: (value: string, name: string) => void;
  onSubmit: () => void;
  videoUploadData: object;
  scanDetail: IUploadScanDetails;
  isScanSubmitting: boolean;
  activeProject: ISelectMenuList | null;
  activeFolder: ISelectMenuList | null;
  setActiveProject: Dispatch<SetStateAction<ISelectMenuList | null>>;
  setActiveFolder: Dispatch<SetStateAction<ISelectMenuList | null>>;
  projectsDropdownData: ISelectMenuList[];
  foldersDropdownData: ISelectMenuList[] | null;
  showProjectDropdown: boolean;
  setShowProjectDropdown: Dispatch<SetStateAction<boolean>>;
  showFolderDropdown: boolean;
  setShowFolderDropdown: Dispatch<SetStateAction<boolean>>;
  handleLaterUpload: () => void;
}

type DropdownWithIconProps = {
  label: string;
  Icon: JSX.Element;
  activeItem: ISelectMenuList | null;
  setActiveItem: Dispatch<SetStateAction<ISelectMenuList | null>>;
  items: ISelectMenuList[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
};

const DropdownWithIcon = ({
  label,
  Icon,
  activeItem,
  setActiveItem,
  items,
  open,
  setOpen,
  placeholder,
}: DropdownWithIconProps) => {
  return (
    <View style={styles.dropDownRow}>
      <View style={styles.iconAndTextContainer}>
        {Icon}
        <Text style={{ marginLeft: 12 }}>{label}</Text>
      </View>
      {/* <DropDownPicker
        open={open}
        setOpen={setOpen}
        items={items}
        value={activeItem}
        setValue={setActiveItem}
        style={{ borderWidth: 0, width: "70%", height: "4%", zIndex: -1 }}
        textStyle={{ fontFamily: "Poppins-Regular", color: "#7E8491" }}
        ArrowDownIconComponent={ChevronDown}
        // @ts-ignore
        arrowIconStyle={{ color: "#7E8491" }}
        dropDownDirection="BOTTOM"
        placeholder={placeholder}
        dropDownContainerStyle={{
          position: "absolute",
          left: "-30%",
          backgroundColor: "#fff",
        }}
        itemSeparatorStyle={{
          width: "100%",
          height: 1,
          backgroundColor: "#9E9E9E",
        }}
      /> */}
      <View
        style={{
          alignItems: "flex-start",
          width: "50%",
        }}
      >
        <DropDownModal
          open={open}
          setOpen={setOpen}
          items={items}
          setActiveItem={setActiveItem}
          activeItem={activeItem}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

const UploadScanDetailsSheet = forwardRef<
  BottomSheetModal,
  UploadScanDetailsSheetProps
>((props, _): JSX.Element => {
  return (
    <BottomSheet
      {...props}
      ref={props.bottomSheetModalRef}
      style={styles.root}
      backdropComponent={(params) => (
        <BottomSheetBackdrop {...params} appearsOnIndex={1} />
      )}
      enablePanDownToClose={false}
    >
      <Text style={{ marginTop: 16, marginBottom: 4 }}>Scan Details</Text>
      <IconInput
        label="Scan Name"
        category="Personal"
        placeholder="Enter scan name"
        onChangeText={props.onChangeText}
        value={props.scanDetail.scanName}
        editable={true}
        Icon={VideoCameraOutline}
        keyName="scanName"
      />
      <View>
        <DropdownWithIcon
          Icon={<FolderOutline />}
          label="Project"
          placeholder="Select Project"
          open={props.showProjectDropdown}
          setOpen={props.setShowProjectDropdown}
          items={props.projectsDropdownData}
          activeItem={props.activeProject}
          setActiveItem={props.setActiveProject}
        />
        <DropdownWithIcon
          Icon={<FolderOutline />}
          label="Folder"
          placeholder="Select Folder"
          open={props.showFolderDropdown && props.activeProject !== null}
          setOpen={props.setShowFolderDropdown}
          items={props.foldersDropdownData || []}
          activeItem={props.activeFolder}
          setActiveItem={props.setActiveFolder}
        />
      </View>
      <IconInput
        label="Location"
        category="Personal"
        placeholder="location"
        onChangeText={props.onChangeText}
        value={props.scanDetail.location}
        editable={false}
        Icon={LocationPin}
        keyName="location"
      />
      <IconButton
        label="Submit Scan"
        onPress={props.onSubmit}
        style={{ marginTop: 30 }}
        disabled={props.isScanSubmitting}
        loading={props.isScanSubmitting}
      />
      <IconButton
        label="Upload Later"
        onPress={props.handleLaterUpload}
        style={{ marginTop: 12, backgroundColor: "#F4F5FF" }}
        propTextStyle={{ color: "#7E7D7D" }}
      />
      {/* <IconDetail label="Location" category="Personal" />
        <IconDetail label="Location" category="Personal" />
        <IconDetail label="Location" category="Personal" /> */}
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: "5.3%",
  },
  allLightButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lightButtonContainer: {
    padding: 8,
    width: "20%",
    maxWidth: 100,
    borderRadius: 16,
    backgroundColor: "#F0F0F0",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  lightButtonText: {
    color: "#5E5D5D",
    marginTop: 4,
  },
  dropDownRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    borderColor: "#F1F3F3",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    position: "relative",
    zIndex: 2,
  },
  iconAndTextContainer: {
    flexDirection: "row",
    width: "40%",
  },
});

export default UploadScanDetailsSheet;
