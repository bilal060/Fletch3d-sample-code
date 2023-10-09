import { CircleAdd, Folder, Person, VideoCamera } from "assets/icons";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { SvgProps } from "react-native-svg";

interface BottomTabButtonProps extends TouchableOpacityProps {
  bottomNavigation: (screen: string) => void;
  Icon: React.ElementType<SVGElement>;
  screen: string;
  activeIcon: string;
}

type BottomTabProps = {
  bottomNavigation: (screen: string) => void;
  activeIcon: string;
};

const BottomTabButton = (props: BottomTabButtonProps): JSX.Element => {
  const { Icon, screen, bottomNavigation, activeIcon } = props;
  return (
    <TouchableOpacity
      {...props}
      onPress={() => bottomNavigation(screen)}
      style={{ alignItems: "center" }}
    >
      <Icon style={{ marginBottom: 8 }} color="#fff" />
      {activeIcon === screen && (
        <View
          style={{
            width: "80%",
            height: 1,
            borderRadius: 10,
            backgroundColor: "#fff",
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const BottomTab = ({ bottomNavigation, activeIcon }: BottomTabProps) => {
  return (
    <>
      <BottomTabButton
        Icon={VideoCamera}
        screen="Videos"
        bottomNavigation={bottomNavigation}
        activeIcon={activeIcon}
      />
      <BottomTabButton
        Icon={CircleAdd}
        screen="AddScan"
        bottomNavigation={bottomNavigation}
        style={{ marginHorizontal: 40 }}
        activeIcon={activeIcon}
      />
      <BottomTabButton
        Icon={Folder}
        screen="Projects"
        bottomNavigation={bottomNavigation}
        activeIcon={activeIcon}
      />
    </>
  );
};

export default BottomTab;
