import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

async function createUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash("admin123", salt);
    const userPassword = await bcrypt.hash("user123", salt);

    // Create Admin User
    const adminUser = await User.findOneAndUpdate(
      { email: "admin@gtsask.com" },
      {
        name: "Admin GTS",
        title: "Administrator",
        role: "Admin",
        email: "admin@gtsask.com",
        password: adminPassword,
        isAdmin: true,
        isActive: true,
      },
      { upsert: true, new: true }
    );
    console.log("Admin user created:", adminUser.email);

    // Create Regular User
    const regularUser = await User.findOneAndUpdate(
      { email: "user@gtsask.com" },
      {
        name: "John User",
        title: "Developer",
        role: "User",
        email: "user@gtsask.com",
        password: userPassword,
        isAdmin: false,
        isActive: true,
      },
      { upsert: true, new: true }
    );
    console.log("Regular user created:", regularUser.email);

    console.log("\n=== TEST CREDENTIALS ===");
    console.log("ADMIN: admin@gtsask.com / admin123");
    console.log("USER:  user@gtsask.com / user123");
    console.log("========================\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createUsers();
