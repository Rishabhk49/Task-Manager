import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
    };

    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedDate(task.date);
  };

  const handleUpdate = async (id) => {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, {
      title: updatedTitle,
      description: updatedDescription,
      date: updatedDate,
    });

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: updatedTitle, description: updatedDescription, date: updatedDate }
          : task
      )
    );
    setEditingTask(null);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 mt-8">Task List</h2>
      <ul className="space-y-4 w-3/4 mx-auto p-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="p-4 flex justify-between items-center">
              {editingTask === task.id ? (
                <div className="flex flex-col sm:flex-row sm:items-center flex-1 space-y-2 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    className="border rounded px-3 py-2 flex-1"
                    placeholder="Edit title"
                  />
                  <input
                    type="text"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                    className="border rounded px-3 py-2 flex-1"
                    placeholder="Edit description"
                  />
                  <input
                    type="date"
                    value={updatedDate}
                    onChange={(e) => setUpdatedDate(e.target.value)}
                    className="border rounded px-3 py-2 flex-1"
                  />
                </div>
              ) : (
                <div className="flex flex-1 justify-between items-center sm:space-x-4">
                  <h3 className="font-semibold text-lg flex-1 text-center">{task.title}</h3>
                  <p className="text-gray-600 flex-1 text-center">{task.description}</p>
                  <span className="text-gray-500 flex-1 text-center">{task.date}</span>
                </div>
              )}

              <div className="flex space-x-4">
                {editingTask === task.id ? (
                  <button
                    onClick={() => handleUpdate(task.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(task)}
                    className="text-blue-500 hover:text-blue-700 transition-all duration-200"
                  >
                    <FaEdit size={20} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-700 transition-all duration-200"
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
