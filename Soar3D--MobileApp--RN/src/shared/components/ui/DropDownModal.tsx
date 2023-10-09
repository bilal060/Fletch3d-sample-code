import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  ModalBaseProps,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
} from "react-native";
import { ISelectMenuList } from "shared/types/utils/utils.type";
import Text from "./Text";
import { Check } from "react-native-feather";
import { ChevronDown } from "assets/icons";
import Button from "./Button";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

interface DropDownModalProps extends ModalBaseProps {
  items: ISelectMenuList[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activeItem: ISelectMenuList | null;
  setActiveItem: Dispatch<SetStateAction<ISelectMenuList | null>>;
  placeholder: string;
}

type DropDownListItemProps = {
  item: ISelectMenuList;
  setActiveItem: (value: ISelectMenuList) => void;
  isActive: boolean;
};

const DropDownListItem = ({
  item,
  setActiveItem,
  isActive,
}: DropDownListItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => setActiveItem(item)}
      style={styles.listItemContainer}
    >
      <Text style={styles.text}>{item.label}</Text>
      {isActive && <Check color="#7E8491" />}
    </TouchableOpacity>
  );
};

const DropDownModal = (props: DropDownModalProps) => {
  const modalHeight = new Animated.Value(0);

  const openModal = () => {
    const contentHeight = calculateContentHeight();
    const modalHeightValue = Math.min(contentHeight, height * 0.25);

    Animated.timing(modalHeight, {
      toValue: modalHeightValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const calculateContentHeight = () => {
    return props.items.length > 0 ? props.items.length * 56 : 0;
  };

  const setActiveItem = (value: ISelectMenuList) => {
    props.setActiveItem(value);
  };

  const handleDropDownEvent = () => {
    props.setOpen(!props.open);
  };

  useEffect(() => {
    if (props.open) openModal();
    else closeModal();
  }, [props.open]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ISelectMenuList>) => (
      <DropDownListItem
        item={item}
        setActiveItem={setActiveItem}
        isActive={item.value === props.activeItem?.value}
      />
    ),
    [props.setActiveItem]
  );

  return (
    <View style={styles.root}>
      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity
          style={styles.placeholderContainer}
          onPress={handleDropDownEvent}
        >
          <Text style={styles.text}>
            {props.activeItem?.label || props.placeholder}
          </Text>
          <ChevronDown />
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.modalContainer, { height: modalHeight }]}>
        <View style={styles.modalContent}>
          {props.items.length > 0 && (
            <FlatList
              data={props.items}
              renderItem={renderItem}
              style={{ width: "100%" }}
            />
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: "relative",
  },
  listItemContainer: {
    width: width * 0.9,
    borderColor: "#9E9E9E",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  placeholderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width * 0.5,
  },
  modalContainer: {
    left: "-70%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    backfaceVisibility: "hidden",
    width: width * 0.9,
    maxHeight: height * 0.25,
  },
  modalContent: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width,
    flex: 1,
  },
  text: {
    fontSize: 11,
  },
});

export default DropDownModal;
