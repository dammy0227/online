// seedAdmin.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { seedAdminUser } from "./services/userService.js";
import { hashPassword } from "./utils/hash.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to DB
    await connectDB();

    // Prepare admin data
    const adminData = {
      fullName: "Default Admin",
      email: "dammy@gmail.com",
      username: "admin",
      password: await hashPassword("dammy123"), 
      role: "admin",
    };

    // Seed admin if none exists
    const admin = await seedAdminUser(adminData);

    if (admin) {
      console.log("✅ Admin user created:", admin.email);
    } else {
      console.log("ℹ️ Admin already exists. No new admin created.");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    mongoose.connection.close();
  }
};


seedAdmin();
