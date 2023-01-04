import Post from "../models/Post";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";

// create
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, title, picturePath } = req.body;

    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      login: user?.login,
      title,
      picturePath,
      likes: {},
    });

    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }
};

// read

export const getFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getFeedHot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.find();

    let hotPosts = [] as any

    const filterHot = async () => {
      post.map((item: any)=>{
        // @ts-ignore
        if (item.likes.size >= 2) {
          // @ts-ignore
          hotPosts.push(item)
        }
      })
    }
    filterHot()
    res.status(200).json(hotPosts);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};


// export const getFeedHot = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const post = await Post.find({
//       $where: function() {
//         return Object.keys(this.likes).length >= 5;
//       },
//     });
//     res.status(200).json(post);
//   } catch (err: any) {
//     res.status(404).json({ message: err.message });
//   }
// };

// update

export const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post: any = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    console.log(isLiked);

    if (isLiked) {
      post.likes.delete(userId);
      console.log("first");
    } else {
      post.likes.set(userId, true);
      console.log("second");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
