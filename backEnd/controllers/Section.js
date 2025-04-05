const Tag = require("../models/Tags");

exports.createTag = async(req,res)=>{

   try{
      const {name,description} = req.body;

      if(!name || !description){
         return res.status(401).json({
            success:false,
            message:"Please fill all the fields",
         })
      }

      const tagDetails = await Tag.create({
         name:name,
         description:description,
      })
      console.log("tagDetails : ", tagDetails);
      return res.status(200).json({
         success:true,
         message:"Tag created Successfully",
      })
   }
   catch(e){
      return res.status(500).json({
         success:false,
         message:"Something went wrong while creating the tag",
      })
   }
}


exports.showAlltags = async(req,res)=>{
   try{
      const Tags = await find({},{name:true , description:true});
      if(!Tags){
         return res.status(401).json({
            success:false,
            message:"No tags found",
         })
      }
      return res.status(200).json({
         success:true,
         message:"Tags fetched Successfully",
         Tags:Tags,
      })
   }
   catch(e){
      return res.status(500).json({
         success:false,
         messag:"Something went wrong while fetching the tags",
      })
   }
}