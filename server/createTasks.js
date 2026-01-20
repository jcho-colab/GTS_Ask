import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, default: new Date() },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
    },
    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress", "completed"],
    },
    activities: [
      {
        type: {
          type: String,
          default: "assigned",
          enum: ["assigned", "started", "in progress", "bug", "completed", "commented"],
        },
        activity: String,
        date: { type: Date, default: new Date() },
        by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    subTasks: [{ title: String, date: Date, tag: String, isCompleted: Boolean }],
    assets: [String],
    links: [String],
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
    description: String,
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

async function createTasks() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Get admin user
    const User = mongoose.model("User", new mongoose.Schema({}, { strict: false }));
    const admin = await User.findOne({ email: "admin@gtsask.com" });
    const user = await User.findOne({ email: "user@gtsask.com" });

    if (!admin) {
      console.log("Admin user not found. Please create users first.");
      process.exit(1);
    }

    // Sample tasks
    const tasks = [
      {
        title: "Review project requirements",
        priority: "high",
        stage: "completed",
        team: [admin._id, user._id],
        description: "Review and finalize project requirements document"
      },
      {
        title: "Design system architecture",
        priority: "high", 
        stage: "in progress",
        team: [admin._id],
        description: "Create system architecture diagrams"
      },
      {
        title: "Setup development environment",
        priority: "medium",
        stage: "completed",
        team: [user._id],
        description: "Install and configure development tools"
      },
      {
        title: "Implement user authentication",
        priority: "high",
        stage: "in progress",
        team: [admin._id, user._id],
        description: "Build login and registration features"
      },
      {
        title: "Create database schema",
        priority: "medium",
        stage: "todo",
        team: [admin._id],
        description: "Design and implement database models"
      },
      {
        title: "Write unit tests",
        priority: "low",
        stage: "todo",
        team: [user._id],
        description: "Create comprehensive test coverage"
      }
    ];

    for (const taskData of tasks) {
      await Task.findOneAndUpdate(
        { title: taskData.title },
        taskData,
        { upsert: true, new: true }
      );
      console.log("Created task:", taskData.title);
    }

    console.log("\nSample tasks created successfully!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createTasks();
