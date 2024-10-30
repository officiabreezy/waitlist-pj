const nodemailer = require('nodemailer');
const waitlist = require('../model/waitlistModel');
require('dotenv').config()

const waitlistInfo = async (req,res) =>{
  const { name, email} = req.body;
  console.log(req.body);

  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }
    
  try {
    const existingWaitlist = await waitlist.findOne({ email: email});
    
    if(existingWaitlist){
        return res.status(400).json({ message:'waitlist already found'})
    }
   
    const WaitlistEntry = new waitlist({ name, email});
    await WaitlistEntry.save();

    res.status(201).json({ message:'You have been added to the waitlist!'});

   const transporter = nodemailer.createTransport({
      service : 'gmail',
      auth: {
          user: process.env.user_email,
          pass: process.env.user_password,
      },
    });

    //const sendConfirmationEmail = (email) => {
    const mailOptions = {
      from: process.env.user_email,
      to: `${WaitlistEntry.email}`,
      subject: 'Waitlist Confirmation',
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #f4f4f4;">
        <img src="./banner.jpg" alt="Banner" width={150px} >
        
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">Thank you for joining the waitlist!</h2>
          <p style="color: #555;">
            Hi <strong>${WaitlistEntry.email}</strong>,<br><br>
            We're excited to have you on our waitlist! We'll keep you updated with all the latest news.
          </p>
          <p style="color: #777;">Best regards,<br>talenxify</p>
        </div>

        <footer style="margin-top: 20px; color: #999; font-size: 12px;">
          &copy; 2024 Your Company. All rights reserved.
        </footer>
      </div>
    `
    
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      console.log( 'Error sending mail:', error);
    } else {
      console.log( 'email sent successfully:', info.response);
    }
  });
//};
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error"});
  }
};

const waitlists = async(req,res) => {
 try {
   const waitlists = await waitlist.find();
   res.status(200).send(waitlists);
  } catch (error) {
   res.status(500).json({ message: "error getting waitlists"});
 }
};

const deleteWaitlist = async(req,res) => {
  console.log("delete request received");
  const {email} = req.body; 
  try {
    const removedWaitlist = await waitlist.findOneAndDelete({email:email});
    
     if(!removedWaitlist){
      return res.status(404).json({ message: "waitlist not found"});
     }
    res.status(200).json({ message: "waitlist deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error deleting waitlist"});
  }
};


const updatedWaitlist = async(req,res) => {
  const id = req.params.id;
  const { name, email} = req.body;

  try {
    const updatedWaitlist = await waitlist.findByIdAndUpdate(id, {name, email}, {new: true});

    if(!updatedWaitlist){
      return res.status(404).json({ message: "waitlist not found"});
    }
   res.status(200).send(updatedWaitlist); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error updating waitlist"});
  }
};

module.exports = {waitlistInfo, waitlists, deleteWaitlist, updatedWaitlist};