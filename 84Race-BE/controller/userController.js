const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/index').User;
const Address = require('../models/index').Address;

exports.getUserFromToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user_id: decoded.user_id });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};


exports.register = async (req, res) => {
  const { username, email, password, full_name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      full_name,
      role: 'user', 
    });
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Email and password are required');

  try {

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Incorrect password');

    const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ user_id: user.user_id, token, role: user.role });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};

exports.getUser = async (req, res) => {
  const userId = req.params.id; 

  try {
    const user = await User.findByPk(userId, {
      attributes: ['user_id', 'username', 'email' , 'full_name', 'profile_image', 'role'] 
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
};

exports.getProfile = async (req, res) => {
  const userId = req.params.id;
  const address_id = req.params.address_id;
  if (!userId) {
    return res.status(400).send('User ID is required');
  }

  try {
    const user = await User.findByPk(userId, {
      attributes: ['user_id', 'username', 'email', 'full_name', 'profile_image', 'role'],
      include: [{
        model: Address,
        as: 'addresses', 
        where: address_id ? { address_id } : undefined,
        required: false 
      }]
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
};

exports.updateProfile = async(req,res) => {
  const userId = req.params.id;
  const {username, email, full_name, profile_image} = req.body;
  
  if(!userId) return res.status(400).send('User ID is required');

  try{
    const user = await User.findByPk(userId);
    if(!user) return res.status(404).send('User not found');
    
    user.username = username || user.username;
    user.email = email || user.email;
    user.full_name = full_name || user.full_name;
    user.profile_image = profile_image || user.profile_image;

    await user.save();
    res.status(200).send('Profile updated successfully');
  }catch(error){
    res.status(500).send('Error: ' + error.message);
  }

};


