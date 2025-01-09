import axios from "axios";
import { useState } from "react";
import { Alert, Button, TextInput, View, Text, StyleSheet } from "react-native";


const App = () => {
  const [Ip, setIp] = useState("");
  const [Port, setPort] = useState("");

  const CheckingIP = async () => {
    if (!Ip || !Port) {
        Alert.alert("Error", "Please enter both IP and Port");
        return;
    }

    const baseURL = `http://${Ip}:${Port}`;
    console.log(`Attempting to connect to: ${baseURL}/api/test`); // Log the request

    try {
        // Create Axios instance
        const api = axios.create({
            baseURL: baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Send GET request
        const response = await api.get("/api/test", { timeout: 4000 });
        console.log("Response received:", response.data); // Log the response
        Alert.alert("Success", `Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
        console.error("Request error:", error); // Log the error
        Alert.alert("Error", `Failed to connect: ${error.message}`);
    }
};



return (
    <View style={styles.container}>
      <Text style={styles.label}>Server IP:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter IP"
        value={Ip}
        onChangeText={setIp}
      />
      <Text style={styles.label}>Server Port:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Port"
        value={Port}
        onChangeText={setPort}
        keyboardType="numeric"
      />
      <Button title="Send Request" onPress={CheckingIP} />
    </View>
  
)
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 20 },
});
export default App;