const cloudinary = require("cloudinary").v2
const fs = require("fs")

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder }
  if (height) {
    options.height = height
  }
  if (quality) {
    options.quality = quality
  }
  options.resource_type = "auto"
  console.log("OPTIONS", options)
  console.log("File info:", { name: file.name, size: file.size, tempFilePath: file.tempFilePath })
  
  try {
    // Check if temp file exists
    if (!file.tempFilePath || !fs.existsSync(file.tempFilePath)) {
      // If temp file doesn't exist, try uploading from buffer
      if (!file.data || file.data.length === 0) {
        throw new Error("Empty file - no data or temp file available")
      }
      
      console.log("Temp file not found, uploading from buffer...")
      return await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
          if (error) {
            console.log("Cloudinary upload error:", error)
            reject(error)
          } else {
            resolve(result)
          }
        })
        stream.end(file.data)
      })
    }
    
    // Upload from temp file path
    console.log("Uploading from temp file path...")
    const result = await cloudinary.uploader.upload(file.tempFilePath, options)
    
    // Clean up temp file
    fs.unlink(file.tempFilePath, (err) => {
      if (err) console.log("Error deleting temp file:", err)
    })
    
    return result
  } catch (error) {
    console.log("Upload error:", error)
    throw error
  }
}
