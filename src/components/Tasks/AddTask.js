import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the new task to Firestore, including the date field
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        date,
      });
      setTitle("");
      setDescription("");
      setDate(""); // Reset the form
      alert("Task added!");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <h1 className="text-3xl font-bold mt-14 text-[20px]">Add Task</h1>
      <div className="flex justify-center space-x-4 ">

      <input
  type="text"
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
/>

<input
  type="text"
  placeholder="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
/>

<input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
/>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTask;
