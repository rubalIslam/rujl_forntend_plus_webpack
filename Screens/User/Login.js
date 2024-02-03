import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button,Input,TouchableHighlight, Pressable ,TextInput } from "react-native";
//import FormContainer from "../../Shared/Form/FormContainer";
//import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
//import EasyButton from "../../Shared/StyledComponents/EasyButton";

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("User Profile");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      console.log("dispatch",context.dispatch)
      loginUser(user, context.dispatch);
    }
  };

  return (
    <View title={"Login"} style={styles.justifyContainer}>
      <TextInput
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        style={{textAlign: "center", backgroundColor: 'transparent', borderWidth: 1, fontSize: 10, padding: 10, marginTop: 200 }}
      />
      <TextInput
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={{textAlign: "center", backgroundColor: 'transparent', marginTop: 20, borderWidth: 1, fontSize: 10, padding: 10 }}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <Pressable  
          style={{ 
            backgroundColor: 'lightblue', 
            color: 'red', 
            padding: 5, borderRadius: 5, marginTop: 50, marginRight: 5, width: "100%", alignItems: "center" }}
          onPress={() => handleSubmit()}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </Pressable >
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <Pressable 
        onPress={() => props.navigation.navigate("Register")}
            style={{ alignItems: "center", backgroundColor: "transparent" }}
        >
          <Text style={{ color: "white" }}>Register</Text>
        </Pressable >
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  justifyContainer: {
    //flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonGroup: {
    width: "100%",
    //alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default Login;
