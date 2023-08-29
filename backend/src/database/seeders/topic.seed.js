import TopicModel from "../models/topic.model.js";

const topics = [
  { name: "Science" },
  { name: "Technology" },
  { name: "Engineering" },
  { name: "Mathematics" },
  { name: "Movie" },
  { name: "Football" },
  { name: "Netflix" },
  { name: "Trivia" },
  { name: "Night Dates" },
  { name: "Karaoke" },
  { name: "Memes" },
  { name: "Art" },
  { name: "Yoga" },
  { name: "Sneakers" },
  { name: "Dance" },
  { name: "Gym" },
  { name: "Writing" },
  { name: "Foodie" },
  { name: "Politics" },
];

export const topicSeeder = async () => {
  try {
    const pms = await TopicModel.insertMany(topics);
    console.log("\u001b[" + 34 + "m" + `Topics seeded` + "\u001b[0m");
  } catch (e) {
    console.log("\x1b[31m%s\x1b[0m", e);

    throw e;
  }
};
