import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderTask = ({ item, index }) => (
    <ListItem
      bottomDivider
      containerStyle={[
        styles.taskContainer,
        item.completed && styles.completedTask,
      ]}
    >
      <ListItem.Content>
        <ListItem.Title
          style={[styles.taskText, item.completed && styles.completedTaskText]}
        >
          {item.text}
        </ListItem.Title>
      </ListItem.Content>
      <Icon
        name={item.completed ? "check-box" : "check-box-outline-blank"}
        type="material"
        color={item.completed ? "green" : "#aaa"}
        onPress={() => toggleTask(index)}
      />
      <Icon
        name="delete"
        type="material"
        color="red"
        onPress={() => removeTask(index)}
      />
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <Button title="Adicionar" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  taskContainer: {
    marginBottom: 8,
    borderRadius: 4,
  },
  taskText: {
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  completedTaskText: {
    color: "#aaa",
  },
});

export default TodoList;
