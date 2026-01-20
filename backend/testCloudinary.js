import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("🔑 Loaded Cloudinary Config:");
console.log({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✅ exists" : "❌ missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ exists" : "❌ missing",
});


const testUpload = async () => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      { folder: "test_uploads" }
    );

    console.log("✅ Upload Success:", result.secure_url);
  } catch (error) {
    console.error("❌ Upload Failed:", error.message);
  }
};

testUpload();
