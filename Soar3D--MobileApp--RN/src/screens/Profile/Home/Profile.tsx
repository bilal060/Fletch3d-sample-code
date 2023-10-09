import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Button, Heading, Text } from "shared/components/ui";
import useProfile from "./useProfile";
import { IconDetail } from "shared/components/ui";
import { normalizeHeight } from "shared/utils/dimension";
import { useAppDispatch } from "shared/hooks/useRedux";
import { logOut } from "shared/utils/auth";
import { Envelope, Lightning, Phone } from "assets/icons";
import { fontSize } from "shared/constants/resposnevaraiable";

type StatsTextProps = {
  label: string;
  value: number;
};

type NavigationButtonProps = {
  label: string;
};

const NavigationButton = ({ label }: NavigationButtonProps): JSX.Element => {
  return (
    <TouchableOpacity style={styles.navigationButton}>
      <Text style={styles.navigationButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const StatsText = ({ label, value }: StatsTextProps): JSX.Element => {
  return (
    <View style={styles.singleStatContainer}>
      <Heading style={styles.statsValue}>{value}</Heading>
      <Text>{label}</Text>
    </View>
  );
};

const Profile = (): JSX.Element => {
  const {
    image,
    name,
    scanCredit,
    email,
    address,
    secondaryEmail,
    phoneNumber,
    phoneNumberVerified,
    secondaryEmailVerified,
  } = useProfile();
  const { height } = useWindowDimensions();
  const dispatch = useAppDispatch();

  const onPress = () => {
    console.log("LET'S SET UP");
  };

  return (
    <View style={styles.root}>
      <View>
        <View style={styles.profileDetailsContainer}>
          <Image
            source={{ uri: image }}
            style={{ width: "14%", aspectRatio: 1, borderRadius: 12 }}
          />
          <Text style={styles.greetingsText}>Welcome Back,</Text>
          <Heading style={styles.name}>{name}</Heading>
          <View style={styles.scanCreditsContainer}>
            <Lightning />
            <Text style={styles.scanCreditsText}>Scan Credits</Text>
            <Text style={styles.scanCreditsValue}>{scanCredit}</Text>
          </View>
          {/* <View style={styles.statsContainer}>
          <StatsText label="Followers" value={13} />
          <StatsText label="Projects" value={3} />
          <StatsText label="Scans" value={15} />
        </View> */}
          {/* <View style={styles.navigationButtonContainer}>
          <NavigationButton label="Edit Profile" />
        </View> */}
        </View>
        <Text style={styles.accountDetailsText}>Account Details</Text>
        <IconDetail
          label="Email"
          value={email}
          Icon={<Envelope style={styles.icon} />}
        />
        {/* <IconDetail
        label="Address"
        value={address ? address?.street + " " + address?.city : undefined}
        buttonLabel="Setup"
        onPress={onPress}
      />
      <IconDetail
        label="Secondary Email"
        value={secondaryEmail}
        buttonLabel={
          secondaryEmailVerified
            ? undefined
            : secondaryEmail
            ? "Verify"
            : "Setup"
        }
        onPress={onPress}
      /> */}
        {phoneNumber && (
          <IconDetail
            label="Phone Number"
            value={phoneNumber}
            buttonLabel={
              phoneNumberVerified ? undefined : phoneNumber ? "Verify" : "Setup"
            }
            onPress={onPress}
            Icon={<Phone style={styles.icon} />}
          />
        )}
      </View>
      <Button
        label="Log Out"
        onPress={() => logOut(dispatch)}
        style={{ marginTop: 24 }}
      />
      {/* <View style={[styles.emptySpaceBelow, { height: height * 0.15 }]} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingBottom: "10%",
  },
  profileDetailsContainer: {
    alignItems: "center",
    marginTop: normalizeHeight(20),
  },
  greetingsText: {
    color: "#5E5D5D",
    marginTop: normalizeHeight(12),
    marginBottom: normalizeHeight(8),
  },
  name: {
    color: "#7680FF",
    fontFamily: "Poppins-Medium",
  },
  statsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: normalizeHeight(24),
  },
  singleStatContainer: {
    alignItems: "center",
  },
  statsValue: {
    color: "#5E5D5D",
    fontFamily: "Poppins-Medium",
  },
  statsLabel: {
    marginTop: 4,
    fontSize: 10,
  },
  navigationButtonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginBottom: normalizeHeight(36),
  },
  navigationButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    marginRight: 8,
  },
  navigationButtonText: {
    color: "#5E5D5D",
  },
  iconButtonsContainer: {
    flexDirection: "row",
    marginTop: "6.67%",
  },
  scanCreditsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderColor: "#FFC107",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: normalizeHeight(12),
    marginBottom: normalizeHeight(29),
  },
  scanCreditsText: {
    color: "#5E5D5D",
    marginLeft: 7,
    marginRight: 16,
    fontSize: fontSize.sixteen,
  },
  scanCreditsValue: {
    color: "#5E5D5D",
    fontSize: fontSize.sixteen,
  },
  emptySpaceBelow: {
    width: "100%",
  },
  icon: {
    marginRight: 12,
  },
  accountDetailsText: {
    fontSize: 11,
  },
});

export default Profile;
