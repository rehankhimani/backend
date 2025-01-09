import axios from "axios";
import { useState } from "react";
import { Alert, Button, TextInput, View, Text, StyleSheet } from "react-native";

const App = () => {
  const [Ip, setIp] = useState("");
  const [Port, setPort] = useState("");

  const CheckingIP = async () => {
    if (!Ip || !Port) {
      Alert.alert("Error", "Please enter IP and Port");
      return;
    }
    try {
      const IP = `http://${Ip}:${Port}`;
      const GetIP = await axios.get(`${IP}/api/test`);
      Alert.alert("Success", `Response: ${JSON.stringify(GetIP.data)}`);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Check the IP and Port or server availability");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter IP:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter IP"
        value={Ip}
        onChangeText={setIp}
      />

      <Text style={styles.label}>Enter Port:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Port"
        value={Port}
        onChangeText={setPort}
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={CheckingIP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
});

export default App;
