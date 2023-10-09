import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface LibraryTypeProps extends TouchableOpacityProps {
  name: string;
  Icon: React.ElementType<SVGElement>;
  selectName?: string;
  selectLibraryType(type: string): void;
}

export default function LibraryType(props: LibraryTypeProps) {
  const { name, Icon, selectName, selectLibraryType } = props;
  const isActive = name === selectName;
  return (
    <TouchableOpacity
      {...props}
      onPress={() => {
        selectLibraryType(name);
      }}
      style={[
        {
          ...style.containerView,
          borderBottomColor: isActive ? "#5E5D5D" : "#9E9E9E",
          borderBottomWidth: isActive ? 2 : 0,
        },
        props.style,
      ]}
    >
      <Icon color={isActive ? "#5E5D5D" : "#9E9E9E"} />

      {/* tintColor: , */}
      <Text
        style={{
          ...style.typeTxt,
          fontFamily: isActive ? "Poppins-Medium" : "Poppins-Light",
          color: isActive ? "#5E5D5D" : "#9E9E9E",
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  containerView: {
    flexDirection: "row",
    alignItems: "center",
    //borderBottomColor: "#5E5D5D",
    borderBottomWidth: 2,
    paddingVertical: "2%",
  },
  typeTxt: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    marginLeft: "4%",
  },
});
