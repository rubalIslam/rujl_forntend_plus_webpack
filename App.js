import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";

import { LogBox,StyleSheet,Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import Toast from "react-native-toast-message";
import { NativeBaseProvider } from 'native-base';

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Context API
import Auth from "./Context/store/Auth";

// Navigatiors
import Main from "./Navigators/Main";

// Screens
import Header from "./Shared/Header";

//LogBox.ignoreAllLogs(true);
/*
export default function App() {
  return (
    <View style={styles.container}>
    {console.log("rujel")}
    <Text>Hello</Text>
    <StatusBar style="auto" />
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/


export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
  }, []);

  const ref = useRef();
  return (
    <NativeBaseProvider>
      <Auth>
        <Provider store={store}>
          <NavigationContainer >
            {/*<Header />*/}
            {/*<Text>hello</Text>*/}
            {<Main />}
            {/*<Toast ref={(ref) => Toast.setRef(ref)} />*/}
          </NavigationContainer>
        </Provider>
      </Auth>
    </NativeBaseProvider>
  );
}

