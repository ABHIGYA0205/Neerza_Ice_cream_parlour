const { cloudinary } = require("./src/config/cloudinary");

cloudinary.api
  .ping()
  .then((result) => {
    console.log("SUCCESS:", result);
  })
  .catch((err) => {
    console.error("ERROR:", err);
  });