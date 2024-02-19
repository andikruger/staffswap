import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  threeLetterCode: {
    type: String,
    required: [true, 'Please provide a three letter code'],
    unique: true,
    match: [/^[A-Z]{3}$/, 'A three letter code is required'],
  },
  userID: {
    type: String,
    required: [true, 'Please provide a user ID'],
    unique: true,
    //match: [/^[A-Z]{3}[0-9]{3}$/, "A user ID is required"],
  },

  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,

    required: true,
    default: 'Junior Agent',
  },
})

const User = mongoose.model('User', userSchema)

export default User
