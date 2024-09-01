// import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const registerUser = async (req, res) => {
  
  const { name, email, password } = req.body;
  try {
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    res.status(200).json({
        Success: true,
        massege: 'User already exist',
      });
  }else{
    const user = await User.create({
      name,
      email,
      password,
    });
    
    
    if (user) {
      res.status(201).json({
        Success: true,
        Data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        }});
      } else {
        res.status(400).json({
          Success: true,
          massege: 'Invalid user data',
        });
      }
  }
} catch (error) {
  res.status(400).json({
    Success: false,
    massege: error,
  });
  console.log(error)
}
};

// export { registerUser };

const loginUser = async (req, res) => {
  
  const {email, password } = req.body;
  try {
  const userExists = await User.findOne({ email });
  
  if (!userExists) {
    res.status(200).json({
        Success: true,
        massege: 'User not exist',
      });
  }else{
    const user = await User.findOne({
      email,
      password,
    });
    
    
    if (user) {
      res.status(201).json({
        Success: true,
        Data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        }});
      } else {
        res.status(400).json({
          Success: true,
          massege: 'Invalid user data',
        });
      }
  }
} catch (error) {
  res.status(400).json({
    Success: false,
    massege: error,
  });
  console.log(error)
}
};

export { registerUser,loginUser };
