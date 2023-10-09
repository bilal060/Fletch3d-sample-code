import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Text, IconDetail, TextButton, Button } from "../ui";
import { RefObject, forwardRef } from "react";
import {
  Clock,
  ColouredFire,
  ColouredStar,
  Delete,
  Fire,
  LocationPin,
  Star,
  VideoCamera,
  VideoCameraOutline,
} from "assets/icons";
import {
  CompletedModel,
  FailedModel,
  ProcessingModel,
  ProcessingQueueModel,
  TrainingModel,
  UnavailableModel,
} from "assets/icons/ModelStatus";
import { formatDate } from "shared/utils/moment";

interface VideoDetailsModalProps extends Omit<BottomSheetProps, "children"> {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  location: string;
  modelStatus: string;
  category: string;
  captureIntent: string;
  createdAt: string;
  handleViewModel: () => void;
  showLocation?: boolean;
  canView?: boolean;
  isScan: boolean;
  canDelete?: boolean;
  handleDelete?: () => void;
  likes?: number;
  starred?: boolean;
  handleLike?: () => void;
  handleStar?: () => void;
  isLiked?: boolean;
}

interface LightIconButtonProps extends TouchableOpacityProps {
  label: string;
  Icon: JSX.Element;
}

const LightIconButton = (props: LightIconButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.lightButtonContainer, props.style]}
    >
      {props.Icon}
    </TouchableOpacity>
  );
};

const getModelStatusIcon = (status: string): JSX.Element => {
  switch (status.toLowerCase()) {
    case "completed":
      return <CompletedModel style={styles.icon} />;
    case "failed":
      return <FailedModel style={styles.icon} />;
    case "processing":
      return <ProcessingModel style={styles.icon} />;
    case "training":
      return <TrainingModel style={styles.icon} />;
    case "in processing queue":
      return <ProcessingQueueModel style={styles.icon} />;
    case "in training queue":
      return <ProcessingQueueModel style={styles.icon} />;
    default:
      return <UnavailableModel style={styles.icon} />;
  }
};

const ICON_COLOUR = "#9E9E9E";

type CircularIconButtonModalProps = {
  Icon: JSX.Element;
  label: string;
  onPress?: () => void;
};

const CircularIconButtonModal = ({
  Icon,
  label,
  onPress,
}: CircularIconButtonModalProps): JSX.Element => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LightIconButton label="View" Icon={Icon} onPress={onPress} />
      <Text style={{ fontSize: 10, marginTop: 8 }}>{label}</Text>
    </View>
  );
};

const VideoDetailsModal = forwardRef<BottomSheetModal, VideoDetailsModalProps>(
  (props, _): JSX.Element => {
    const {
      location,
      modelStatus,
      createdAt,
      category,
      captureIntent,
      handleViewModel,
      showLocation = true,
      canView = true,
      isScan,
      canDelete = true, // Scan can be deleted but posts is conditional
      handleDelete,
      likes,
      handleLike,
      starred,
      handleStar,
      isLiked,
    } = props;

    return (
      <BottomSheetModal
        {...props}
        ref={props.bottomSheetModalRef}
        style={styles.root}
        backdropComponent={(params) => (
          <BottomSheetBackdrop {...params} appearsOnIndex={1} />
        )}
        handleIndicatorStyle={{ width: "20%", backgroundColor: "#E9E9E9" }}
      >
        <View style={styles.allLightButtonsContainer}>
          {!isScan && (
            <CircularIconButtonModal
              Icon={starred ? <ColouredStar /> : <Star color="#9E9E9E" />}
              label="Starred"
              onPress={handleStar}
            />
          )}
          {!isScan && (
            <CircularIconButtonModal
              Icon={isLiked ? <ColouredFire /> : <Fire color="#9E9E9E" />}
              label={likes ? likes.toString() : "0"}
              onPress={handleLike}
            />
          )}
          {canView && (
            <CircularIconButtonModal
              Icon={
                <VideoCameraOutline width={36} height={24} color="#9E9E9E" />
              }
              label="View Model"
              onPress={handleViewModel}
            />
          )}
          {/* <LightIconButton
            label="Open"
            Icon={<Image source={ScanLocation} />}
          />
          <LightIconButton label="Star" Icon={<Image source={ScanStar} />} /> */}
        </View>
        <Text style={{ marginTop: 16 }}>
          {isScan ? "Scan" : "Post"} Details
        </Text>
        <IconDetail
          label="Model Status"
          value={modelStatus}
          Icon={getModelStatusIcon(modelStatus)}
        />
        {showLocation && (
          <IconDetail
            label="Location"
            value={location}
            Icon={<LocationPin color={ICON_COLOUR} style={styles.icon} />}
          />
        )}
        <IconDetail
          label="Category"
          value={category}
          Icon={
            <VideoCameraOutline
              color={ICON_COLOUR}
              style={styles.icon}
              width={20}
              height={20}
            />
          }
        />
        {/* <IconDetail label="Capture Intent" value={captureIntent} /> */}
        <IconDetail
          label="Uploaded At"
          value={formatDate(createdAt)}
          Icon={<Clock color={ICON_COLOUR} style={styles.icon} />}
        />
        {canDelete && (
          <Button
            label={`Delete ${isScan ? "Scan" : "Post"}`}
            style={{ marginTop: 12 }}
            onPress={() => {
              if (handleDelete) {
                handleDelete();
                props.bottomSheetModalRef.current?.close();
              }
            }}
          />
        )}
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: "5.3%",
  },
  allLightButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: "10%",
  },
  lightButtonContainer: {
    padding: 12,
    borderRadius: 100,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    width: "35%",
    minWidth: 50,
    minHeight: 50,
    aspectRatio: 1,
  },
  icon: {
    marginRight: 12,
  },
});

export default VideoDetailsModal;
