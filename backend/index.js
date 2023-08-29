import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import { allowingCors } from "./src/utils/allowing.cors.js";
import { config } from "dotenv";
import rootRoutes from "./src/routes/root.route.js";
import { mongooseConnection } from "./src/config/database.js";
import path from 'path';
import fs from 'fs';

config();

const app = express();
app.use(logger("dev")); 
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use((req, res, next) => allowingCors(req, res, next));
app.options("/*", (_, res) => {
  res.sendStatus(200);
});
app.use("/api", rootRoutes);

// Define the folder path
const folderPath = './src/assets/uploads';

// Check if the folder already exists
fs.stat(folderPath, (err, stats) => {
  if (err) {
    if (err.code === 'ENOENT') {
      // If the folder doesn't exist, create it
      fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) {
          console.error('Error uploads creating folder:', err);
        } else {
          console.log('Folder uploads created successfully!');
        }
      });
    } else {
      // If another error occurred, log the error
      console.error('Error checking uploads folder status:', err);
    }
  }
});

// Get Images
app.get('/get-file/:folder/:file', (req, res) => {
  const folderName = req.params.folder;
  const fileName = req.params.file;
  const filePath = path.join(process.cwd(), 'src', 'assets', folderName, fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {      
      let defaultImage = path.join(process.cwd(), 'src', 'assets', 'images', 'Image_not_available.jpg');
      res.sendFile(defaultImage);
    } else {
      res.sendFile(filePath);
    }
  });
});

// BOILER PLATE MONGOOSE CONNECTION AND SERVER STARTED
mongooseConnection(app);
