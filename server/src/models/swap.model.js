import mongoose from 'mongoose'

const SwapSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: [true, 'A User is required'],
    },
    name: {
      type: String,
      required: [true, 'A Name is required'],
    },

    threeLetterCode: {
      type: String,
      required: [true, 'A Three Letter Code is required'],
    },

    date: {
      type: Date,

      required: [true, 'A date is required'],
    },

    startTime: {
      type: String,
      required: [true, 'A startTime is required'],
    },

    startTimeNumeric: {
      type: Number,
      required: [true, 'A startTimeNumeric is required'],
    },
    endTime: {
      type: String,
      required: [true, 'An endTime is required'],
    },

    endTimeNumeric: {
      type: Number,
      required: [true, 'An endTimeNumeric is required'],
    },

    shiftWish: {
      type: String,
      required: [true, 'A shiftWish is required'],
    },

    qualifications: {
      type: Array,
      required: [false, 'A qualification is required'],
    },

    duration: {
      type: String,
      required: [false, 'A duration is required'],
    },

    note: {
      type: String,
      required: [false, 'A note is required'],
    },
    // create a list of dates that the user could take over this shift

    exchanges: {
      type: Array,
      required: [false, 'A swap date is required'],
    },
    priority: {
      type: Number,
      required: [false, 'A priority is required'],
      default: 3,
    },
    status: {
      type: String,
      required: [false, 'A status is required'],
      default: 'Pending',
    },
    email: {
      type: String,
      required: [false, 'An email is required'],
      // match regex for email
    },
    displayEmail: {
      type: Boolean,
      required: [false, 'A displayEmail is required'],
      default: false,
    },
    phoneNumber: {
      type: String,
      required: [false, 'A phone is required'],
      // match regex for phone
    },
    displayPhoneNumber: {
      type: Boolean,
      required: [false, 'A displayPhoneNumber is required'],
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Swap = mongoose.model('Swap', SwapSchema)

export default Swap
