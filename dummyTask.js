require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('./models/schema/task.model.js');

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Generate Dummy Tasks
const seedTasks = async () => {
  try {
    // Dummy user IDs
    const userIds = ['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9', 'user10'];

    // Task Titles and Descriptions
    const taskTitles = ['Learn React', 'Study Node.js', 'Build API', 'Write Docs', 'Test Features',
      'Fix Bugs', 'Deploy App', 'Research AI', 'Plan Roadmap', 'Design UI'];

    const taskDescriptions = [
      'Complete module 1', 'Understand basics of Express', 'Create RESTful APIs',
      'Document features', 'Write test cases', 'Resolve issues', 'Deploy to production',
      'Explore AI trends', 'Draft feature list', 'Design wireframes'
    ];

    // Current Date for Task Assignment
    const baseDate = new Date();

    let tasks = [];

    // Generate 10 tasks for 10 different users
    for (let i = 0; i < 10; i++) {
      const taskDate = new Date(baseDate);
      taskDate.setDate(baseDate.getDate() + i); // Set task for future dates

      tasks.push({
        title: taskTitles[i],
        description: taskDescriptions[i],
        taskDate: taskDate.toISOString().slice(0, 10),
        userId: userIds[i],
      });
    }

    // Insert Tasks into MongoDB
    await Task.insertMany(tasks);
    console.log('Dummy tasks added successfully!');
  } catch (error) {
    console.error('Error seeding tasks:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run Seeding
const runSeeding = async () => {
  await connectDB();
  await seedTasks();
};

runSeeding();

