import mongoose from "mongoose";
import { config } from "dotenv";
import { topicSeeder } from "./topic.seed.js";

config();
mongoose.connect(process.env.DATABASE_URL);

(async () => {
  try {
    const seeder = await Promise.all([topicSeeder()]);
    console.log("\x1b[32m%s\x1b[0m", "Success: Data seeded");
  } catch (e) {
    console.log("\x1b[31m%s\x1b[0m", "Seeders Failed");
  } finally {
    mongoose.connection.close();
  }
})();
