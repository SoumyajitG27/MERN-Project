import mongoose from "mongoose";
import postModel from "../models/postModels.js";

export const getPosts = async (req, res) => {
   try {
      const postMessages = await postModel.find();
      res.status(200).json(postMessages);
   } catch (error) {
      res.status(404).json({message: error.message});
   }
}

export const createPost = async (req, res) => {
   const post = req.body;
   const newPost = new postModel(post);
   try {
      await newPost.save();
      res.status(201).json(newPost);
   } catch (error) {
      res.status(409).json({message: error.message});
   }
}

export const updatePost = async(req, res) => {
   const {id: _id} = req.params;
   const post= req.body;
   if(!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that ID");
   const updatedPost = await postModel.findByIdAndUpdate(_id, post, {new: true});
   res.json(updatedPost);
}

export const deletePost = async(req,res) => {
   const {id} = req.params;
   if(!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that ID");
   await postModel.findByIdAndRemove(id);
   res.json({message: "Post deleted successfully"});
}

export const likePost = async(req,res) => {
   const {id} = req.params;
   if(!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that ID");
   const post = await postModel.findById(id);
   const updatedPost = await postModel.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});
   res.json(updatedPost);
}