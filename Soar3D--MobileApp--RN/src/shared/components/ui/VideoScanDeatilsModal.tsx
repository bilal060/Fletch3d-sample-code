import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { fontSize, scalableheight } from "shared/constants/resposnevaraiable";
import CheckBox from "@react-native-community/checkbox";
import SelectDropdown from "react-native-select-dropdown";
import { ArrowRight } from "react-native-feather";
import IconButton from "./IconButton";
import DetailPopupItem from "./DeatilPopupItem";

export default function VideoScanDeatilsModal() {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        //  setModal(false);
        // props.onPress();
      }}
      style={styles.outerView}
    >
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.innerMainView}>
          <View style={styles.topLineView}>
            <View style={styles.lineStyle} />
          </View>

          <View style={styles.postDeatilsContainer}>
            <Text style={styles.postText}>Scan Detail</Text>
          </View>

          <DetailPopupItem label={"Scan Name"} inputText={"String 1"} />

          <View
            style={{
              width: "100%",
              height: scalableheight.six,
              //backgroundColor: "red",
              borderTopColor: "#F4F6F6",
              borderBottomColor: "#F4F6F6",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "60%",
                flexDirection: "row",
                height: "100%",
                alignItems: "center",
              }}
            >
              <CheckBox
                //  value={isSelected}
                //onValueChange={setSelection}
                style={{
                  alignSelf: "center",
                  backgroundColor: "#F4F6F6",
                  borderColor: "#F4F6F6",
                  borderWidth: 0,
                  borderRadius: 0,
                }}
              />
              <Text style={styles.postDeatilTypeText}>Project</Text>
            </View>

            <View
              style={{
                width: "40%",
                alignItems: "center",
                height: "100%",
                justifyContent: "center",

                // flexDirection: "row",
                //backgroundColor: "red",
              }}
            >
              <SelectDropdown
                //dropdownOverlayColor="red"
                buttonStyle={{
                  backgroundColor: "white",
                  height: "60%",
                  width: "100%",
                }}
                buttonTextStyle={styles.postText}
                dropdownStyle={{}}
                data={["Project1", "Project 2"]}
                onSelect={(selectedItem, index) => {
                  // console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
          </View>

          <DetailPopupItem
            label={"Location"}
            inputText={"Your Location"}
            // Icon={Homestar}
          />

          <IconButton
            label="Submit Scan"
            style={{ borderRadius: 10 }}
            Icon={<ArrowRight color="#fff" />}
            //onPress={handleSubmit}
          />
          <IconButton
            label="Upload Later"
            propTextStyle={{ color: "#7E7D7D" }}
            style={{
              borderRadius: 10,
              backgroundColor: "#F4F5FF",
              marginTop: 10,
            }}
            Icon={<ArrowRight color="#fff" />}
            //onPress={handleSubmit}
          />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  outerView: {
    //flex: 1,
    justifyContent: "flex-end",
    //backgroundColor: "red",
    // height: "50%",
    bottom: 0,
    position: "absolute",
    //backgroundColor: "red",
  },
  innerMainView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    //width: "100%",
    height: scalableheight.fourtythree,
  },
  topLineView: {
    width: "24%",
    alignSelf: "center",
  },
  lineStyle: {
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 4.5,
  },
  boxContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: "2.5%",
  },
  postDeatilsContainer: {
    width: "100%",
    marginVertical: "2.5%",
  },
  postText: {
    fontWeight: "500",
    color: "#7E8491",
    fontFamily: "Poppins-Regular",
    lineHeight: 16,
    fontSize: fontSize.eleven,
    width: "100%",
  },
  postDeatilTypeText: {
    fontWeight: "600",
    color: "#0E100F",
    fontFamily: "Poppins-Regular",
    lineHeight: 16,
    fontSize: fontSize.twelve,
    marginLeft: 6,
  },
});
