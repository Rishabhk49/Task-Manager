const express = require("express");
const db = require("./firebaseAdmin");
const router = express.Router();

// Fetch all tasks
router.get("/tasks", async (req, res) => {
  try {
    const snapshot = await db.collection("tasks").get();
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new task
router.post('/test', async (req, res) => {
    try {
      // Sample data
      const task = {
        title: 'Test Task',
        description: 'This is a test task to check Firebase connection.',
        completed: false,
      };
  
      // Add task to Firestore
      const docRef = await db.collection('tasks').add(task);
      
      res.status(200).json({ message: 'Task added successfully', id: docRef.id });
    } catch (error) {
      console.error('Error writing to Firestore:', error);
      res.status(500).json({ error: 'Error writing to Firestore' });
    }
  });
  

// Update a task
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await db.collection("tasks").doc(id).update(updatedData);
    res.status(200).json({ id, ...updatedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("tasks").doc(id).delete();
    res.status(200).send("Task deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
