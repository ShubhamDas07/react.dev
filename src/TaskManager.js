import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "./firebaseConfig";

// Function to export Firestore data as JSON
const exportFirestoreData = async () => {
  try {
    const tasksCollection = collection(db, "tasks"); // Replace "tasks" with your collection name
    const querySnapshot = await getDocs(tasksCollection);

    // Extract the documents as an array of objects
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document fields
    }));

    // Convert the data into JSON format
    const jsonData = JSON.stringify(data, null, 2); // Pretty print JSON with indentation

    // Create a Blob to trigger a file download
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "firestore-data.json"; // Name of the file to download
    link.click();

    console.log("Data exported successfully!");
  } catch (error) {
    console.error("Error exporting Firestore data:", error);
  }
};

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [editTaskId, setEditTaskId] = useState(null);

  const tasksCollection = collection(db, "tasks");

  // Fetch tasks from Firestore
  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(tasksCollection);
      const fetchedTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add or update a task
  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = { title, description, status };

    try {
      if (editTaskId) {
        const taskDoc = doc(db, "tasks", editTaskId);
        await updateDoc(taskDoc, taskData);
        setEditTaskId(null);
      } else {
        await addDoc(tasksCollection, taskData);
      }
      setTitle("");
      setDescription("");
      setStatus("pending");
      fetchTasks();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await deleteDoc(taskDoc);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Set a task for editing
  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setEditTaskId(task.id);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">{editTaskId ? "Update Task" : "Add Task"}</button>
      </form>

      <button onClick={exportFirestoreData} style={{ marginTop: "20px" }}>
        Export Tasks
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
            </div>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
