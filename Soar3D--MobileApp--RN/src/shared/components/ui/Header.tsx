import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import Text from "./Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppSelector } from "shared/hooks/useRedux";
import { IUserData } from "shared/types/auth/user.type";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigatorProps } from "shared/navigators/MainNavigator";

type HeaderProps = {
  title?: string;
};

const Header = ({ title }: HeaderProps) => {
  const { top } = useSafeAreaInsets();
  const user = useAppSelector((state) => state.auth.user as IUserData);

  let profileImageUrl;
  if (user?.profile_img) {
    profileImageUrl = user.profile_img?.url;
  }
  const { navigate } = useNavigation<MainStackNavigatorProps>();

  const navigateToProfile = () => {
    navigate("ProfileStack");
  };

  return (
    <View
      style={{
        paddingTop: top,
        backgroundColor: "#fff",
        paddingHorizontal: "5.3%",
      }}
    >
      <View style={style.topHeaderContainer}>
        {/* <Image resizeMode="cover" source={Libraryhumburg} /> */}
        <TouchableOpacity onPress={navigateToProfile}>
          <Image
            source={{ uri: profileImageUrl || "" }}
            style={{ width: 24, height: 24, borderRadius: 5 }}
          />
        </TouchableOpacity>
        <View style={style.headerTxtContainer}>
          <Text style={style.headingTxt}>{title || "Standard"}</Text>
        </View>
        {/* <View style={style.rightIconsContainer}>
          <Image resizeMode="cover" source={LibrarySearch} />
          <View style={{ position: "relative" }}>
            <View style={style.topNotification}></View>
            <Image resizeMode="cover" source={LibraryNotification} />
          </View>
        </View> */}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  topHeaderContainer: {
    width: "100%",
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    paddingHorizontal: "5.3%",
    paddingBottom: 0,
  },
  headerTxtContainer: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "7%",
  },
  headingTxt: {
    fontFamily: "Poppins-Regular",
    fontSize: 21,
    fontWeight: "600",
  },
  rightIconsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    //backgroundColor: "red",
    //width: "30%",
  },
  topNotification: {
    width: 14,
    height: 14,
    paddingHorizontal: 1,
    paddingVertical: 3,
    position: "absolute",
    backgroundColor: "#7680FF",
    borderRadius: 14 / 2,
    bottom: "40%",
    left: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
