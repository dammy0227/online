import cloudinary from "../config/cloudinary.js";

/**
 * Upload file to Cloudinary
 */
export const uploadToCloudinary = async (filePath, folder = "courses") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });
    return { url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

/**
 * Delete file from Cloudinary
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw new Error("Cloudinary deletion failed: " + error.message);
  }
};
