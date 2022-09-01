import postModel from "../models/postModels.js";

export const getPosts = async (req, res) => {
   try {
      const postMessages = await postModel.find();
      res.status(200).json(postMessages);
   } catch (error) {
      res.status(404).json({message: error.message});
   }
}

export const createPost = (req, res) => {
   try {
      
   } catch (error) {
      
   }
}