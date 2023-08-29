import TopicModel from "../../database/models/topic.model.js";
import mongoose from "mongoose";
const findAll = async () => {
  const resp = await TopicModel.find({}).sort({ _id: -1 });
  return { data: { topics: resp } };
};
const findAllByIds = async (ids) => {
  const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
  const resp = await TopicModel.find({ _id: { $in: validIds } });
  return validIds;
};
const fetchAsOptions = async (req) => {
  const search = req.query.search;
  const query = search ? {
     name: { $regex: new RegExp(search, "i") }
  } : {}
  const resp = await TopicModel.find(query).sort({ _id: -1 });
  const data = { results: resp.map((item, index) => ({
      value: item._id,
      label: item.name
    }))
  };
  return { data: { options: data } };
};
const TopicService = {
  findAll,
  findAllByIds,
  fetchAsOptions
};
export default TopicService;
