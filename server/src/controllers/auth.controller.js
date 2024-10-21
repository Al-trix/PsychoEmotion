import UserAdmin from "../models/userAdmin.model.js";
import bcrypt from 'bcryptjs'
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10)
    
    
    const newUser = new UserAdmin({
      username,
      email,
      password: passwordHash,
      role: "admin"
    });

    const savedUserAdmin = await newUser.save();

    const token = await createAccessToken({id: savedUserAdmin._id})
    res.cookie("tokenAdmin", token)
    res.json({
        id: savedUserAdmin._id,
        username: savedUserAdmin.username,
        email: savedUserAdmin.email,
        role: savedUserAdmin.role
    });
  } catch (err) {
      if (err?.errorResponse?.keyPattern?.username){ 
        return res.status(404).json({ error: ["user-existent"] });}

      if (err?.errorResponse?.keyPattern?.email){ 
        return res.status(404).json({ error: ["email-in-use"] });}
      
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await UserAdmin.findOne({email})

    if (!userFound) return res.status(400).json({error: ["email-not-found"]})
    
    const isMatch = await bcrypt.compare(password, userFound.password)
    
    if (!isMatch) return res.status(400).json({error: ["credential-invalid"]})
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("tokenAdmin", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role
    });

  } catch (err) {
    res.status(500).json({ error: err.response.data })
  }

};
export const logOut = (req, res) => {
    res.cookie("tokenAdmin", "", {
        expires: new Date(0)
    })

    return res.sendStatus(200)
};

export const verifyTokenAdmin = async (req, res) => {
  const token = req.cookies.tokenAdmin;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, TOKEN_SECRET, async (err, { id }) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    try {
      const userFound = await  UserAdmin.findOne({
         _id : id
      });


      if (!userFound)
        return res.status(401).json({ message: "Unauthorized" });

      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        role: userFound.role,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};