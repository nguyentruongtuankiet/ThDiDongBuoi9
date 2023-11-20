import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setNote, deleteNote } from "./action";

export default function Screen() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.note);

  const [note1, setNote1] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://retoolapi.dev/9AHu5b/data")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        const user = json.find((user) => user.id === 1);
        if (user && user.job) {
          user.job.forEach((job) => {
            dispatch(setNote(job));
          });
        }
      });
  }, [dispatch]);

  const handleDelete = (index) => {
    const updatedJobs = [...userState.note];
    const deletedJob = updatedJobs.splice(index, 1)[0];

    dispatch(deleteNote(deletedJob));

    const userIndex = data.findIndex((user) => user.id === 1);
    const updatedData = [...data];
    updatedData[userIndex].job = updatedJobs;

    fetch(`https://retoolapi.dev/9AHu5b/data/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData[userIndex]),
    })
      .then((response) => response.json())
      .then((json) => {
        setData(updatedData);
        alert("Xóa thành công 1 note");
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
        alert("Xóa thất bại");
      });
  };

  const handleFinish = () => {
    const userIndex = data.findIndex((user) => user.id === 1);

    if (userIndex !== -1) {
      const newJob = note1;

      const updatedUser = {
        ...data[userIndex],
        job: userState.note ? [...userState.note, newJob] : [newJob],
      };

      dispatch(setNote(newJob));

      fetch(`https://retoolapi.dev/9AHu5b/data/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => response.json())
        .then((json) => {
          const updatedData = [...data];
          updatedData[userIndex] = updatedUser;
          setData(updatedData);
          alert("Thêm thành công 1 job!");
        })
        .catch((error) => {
          alert("thêm thất bại!");
        });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "space-between",
          height: 60,
          width: 370,
          flexDirection: "row",
          marginTop: 15,
        }}
      >
        <Text style={{ fontSize: 30, marginLeft: 15 }}>←</Text>
        <Image
          source={require("../image/avata.png")}
          style={{ height: 53, width: 53, borderRadius: 35, marginLeft: 100 }}
        />
        <View style={{ height: 60, width: 180 }}>
          <Text
            style={{
              textAlign: "center",
              color: "#000",
              fontFamily: "Epilogue",
              fontSize: 22,
              fontWeight: 700,
              fonStyle: "normal",
              marginRight: 65,
            }}
          >
            Hi {data.length > 0 ? data[0].name : ""}
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "#9095A0",
              fontSize: 16,
              fontWeight: 500,
              fonStyle: "normal",
            }}
          >
            Have a great day ahead
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 40,
          width: 320,
          borderWidth: 0.5,
          borderColor: "#9095A0",
          borderRadius: 4,
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../image/search.png")}
          style={{ height: 20, width: 20, marginLeft: 10 }}
        />
        <TextInput
          style={{ height: 38, width: 300, padding: 10, marginLeft: 5 }}
          placeholder="Search"
          onChangeText={(text) => setNote1(text)}
          value={note1}
        />
      </View>
      <View style={{ height: 300, marginTop: 20 }}>
        <ScrollView nestedScrollEnabled>
          {userState.note.length > 0 && (
            <FlatList
              data={userState.note}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 50,
                    margin: 7,
                    height: 40,
                    width: 310,
                    backgroundColor: "#D3D5D8",
                  }}
                >
                  <TouchableOpacity>
                    <View
                      style={{
                        height: 21,
                        width: 18,
                        marginLeft: 17,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={require("../image/tick.png")}
                        style={{ height: 20, width: 17, marginLeft: 17 }}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 17, fontWeight: 500 }}>{item}</Text>
                  <TouchableOpacity onPress={() => handleDelete(index)}>
                    <Text
                      style={{
                        marginRight: 10,
                        fontSize: 15,
                        fontWeight: 700,
                        color: "red",
                      }}
                    >
                      Xóa
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={handleFinish}>
        <View
          style={{
            backgroundColor: "#00BDD6",
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
          }}
        >
          <Text style={{ color: "#FFF", fontSize: 40, marginBottom: 10 }}>
            +
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
  },
});
