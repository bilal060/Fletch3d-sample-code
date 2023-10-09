import { useNavigation, useRoute } from "@react-navigation/native";
import { useRef } from "react";
import { View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { HeaderBackButton } from "shared/components/ui";
import {
  MainStackNavigatorProps,
  ModelViewerRouteProps,
} from "shared/navigators/MainNavigator";

const ModelViewer = (): JSX.Element => {
  const { width, height } = useWindowDimensions();
  const {
    params: { url },
  } = useRoute<ModelViewerRouteProps>();
  const { goBack } = useNavigation<MainStackNavigatorProps>();
  const { top } = useSafeAreaInsets();
  const webViewRef = useRef<WebView>(null);
  const customScript = "delete window.SharedWorker;";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        width,
        height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeaderBackButton
        style={{
          position: "absolute",
          top: top + 20,
          left: "4.5%",
          backgroundColor: "#fff",
          zIndex: 1000,
          borderRadius: 8,
          padding: 4,
        }}
        iconProps={{ width: 18, height: 18 }}
        onPress={goBack}
      />
      <WebView
        ref={webViewRef}
        source={{
          uri: `${url}&embed=true`,
        }}
        style={{ flex: 1, backgroundColor: "#000", width, height }}
        injectedJavaScript={customScript}
        onContentProcessDidTerminate={() => {
          webViewRef.current?.reload();
        }}

        // javaScriptEnabled={true}
        // allowsFullscreenVideo={true}
      />
    </View>
  );
};

export default ModelViewer;
