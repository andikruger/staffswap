const Swap = require("../models/swap.model");
const CryptoJS = require("crypto-js");

function convertTimeToNumber(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error("Invalid time format");
  }

  const timeInHours = hours + minutes / 60;
  return timeInHours;
}

exports.createController = async (req, res) => {
  const {
    userID,
    name,
    threeLetterCode,
    date,
    startTime,
    endTime,
    duration,
    shiftType,
    exchanges,
    qualifications,
    note,
    swapDates,
    priority,
    status,
    email,
    displayEmail,
    phoneNumber,
    displayPhoneNumber,
  } = req.body;
  let encryptedEmail = "";
  let encryptedPhoneNumber = "";
  if (email) {
    encryptedEmail = CryptoJS.AES.encrypt(email, process.env.EMAIL_SECRET);
  }

  if (phoneNumber) {
    // encrypt phone number
    encryptedPhoneNumber = CryptoJS.AES.encrypt(
      phoneNumber,
      process.env.EMAIL_SECRET
    );
  }

  console.log("Swap created");
  console.log(req.body);
  const newSwap = new Swap({
    userID,
    name,
    threeLetterCode,
    date,
    startTime,
    startTimeNumeric: convertTimeToNumber(startTime),
    endTime,
    endTimeNumeric: convertTimeToNumber(endTime),
    duration,
    shiftType,
    exchanges,
    qualifications,
    note,
    swapDates,
    priority,
    status,
    email: encryptedEmail,
    displayEmail,
    phoneNumber: encryptedPhoneNumber,
    displayPhoneNumber,
  });
  await newSwap.save();
  res.status(201).json({
    message: "Swap created successfully",
    data: newSwap,
  });
};

exports.getAllController = async (req, res) => {
  // get all shifts and sort them by date
  const swaps = await Swap.find();
  // sort shifts by date
  const sortedSwap = swaps.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });

  res.status(200).json({
    message: "Swaps fetched successfully",
    data: sortedSwap,
  });
};

exports.getByIDController = async (req, res) => {
  const { id } = req.params;
  const swap = await Swap.findById(id);
  res.status(200).json({
    message: "Swap fetched successfully",
    data: swap,
  });
};

exports.getByUserController = async (req, res) => {
  const { id } = req.params;
  const swaps = await Swap.find({ userID: id });
  res.status(200).json({
    message: "Swaps fetched successfully",
    data: swaps,
  });
};

exports.getCountController = async (req, res) => {
  const count = await Swap.countDocuments();
  res.status(200).json({
    message: "Swap count fetched successfully",
    data: count,
  });
};

exports.getCountUserController = async (req, res) => {
  const { id } = req.params;
  const count = await Swap.countDocuments({ userID: id });
  res.status(200).json({
    message: "Swap count fetched successfully",
    data: count,
  });
};

exports.getNextMonthController = async (req, res) => {
  // get all shifts for the user that have a date in the next month
  const { id } = req.params;
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const swaps = await Swap.find({
    userID: id,
    date: { $gte: nextMonth },
  });
  res.status(200).json({
    message: "Swaps fetched successfully",
    data: swaps,
  });
};

exports.updateController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userID,
      name,
      threeLetterCode,
      date,
      startTime,
      endTime,
      duration,
      shiftType,
      exchanges,
      qualifications,
      note,
      swapDates,
      priority,
      status,
      email,
      displayEmail,
      phoneNumber,
      displayPhoneNumber,
    } = req.body;

    let encryptedEmail = "";
    let encryptedPhoneNumber = "";

    if (email) {
      encryptedEmail = CryptoJS.AES.encrypt(
        email,
        process.env.EMAIL_SECRET
      ).toString();
    }

    if (phoneNumber) {
      encryptedPhoneNumber = CryptoJS.AES.encrypt(
        phoneNumber,
        process.env.EMAIL_SECRET
      ).toString();
    }

    const updatedSwap = await Swap.findByIdAndUpdate(id, {
      userID,
      name,
      threeLetterCode,
      date,
      startTime,
      startTimeNumeric: convertTimeToNumber(startTime),
      endTime,
      endTimeNumeric: convertTimeToNumber(endTime),
      duration,
      shiftType,
      exchanges,
      qualifications,
      note,
      swapDates,
      priority,
      status,
      email: encryptedEmail,
      displayEmail,
      phoneNumber: encryptedPhoneNumber,
      displayPhoneNumber,
    });

    res.status(200).json({
      message: "Swap updated successfully",
      data: updatedSwap,
    });
  } catch (error) {
    console.error("Error updating swap:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteController = async (req, res) => {
  const { id } = req.params;
  const deletedSwap = await Swap.findByIdAndDelete(id);
  res.status(200).json({
    message: "Swap deleted successfully",
    data: deletedSwap,
  });
};

function createSearchQuery(obj) {
  const join = obj.globalJoin;
  const criteria = obj.searchCriteria;

  // Helper function to convert time string to numeric value
  const convertTimeToNumber = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours + minutes / 60;
  };

  // Apply transformations to specific fields
  criteria.forEach((item) => {
    if (item.field === "threeLetterCode") {
      item.value = item.value.toUpperCase();
    } else if (item.field === "priority") {
      item.value = parseInt(item.value);
    }
  });

  // Handle date range conditions
  const dateFromItem = criteria.find((item) => item.field === "dateFrom");
  const dateToItem = criteria.find((item) => item.field === "dateTo");

  if (dateFromItem || dateToItem) {
    const dateRangeCondition = {};

    if (dateFromItem) {
      dateRangeCondition.$gte = new Date(dateFromItem.value);
    }

    if (dateToItem) {
      // Adjust the time to the end of the day
      const adjustedDateTo = new Date(dateToItem.value + "T23:59:59");
      dateRangeCondition.$lte = adjustedDateTo;
    }

    criteria.push({
      field: "date",
      value: dateRangeCondition,
    });

    // Remove date conditions from criteria
    if (dateFromItem) {
      criteria.splice(criteria.indexOf(dateFromItem), 1);
    }

    if (dateToItem) {
      criteria.splice(criteria.indexOf(dateToItem), 1);
    }
  }

  // Handle timeTo and timeFrom conditions
  const handleTimeCondition = (field, operator) => {
    const timeItem = criteria.find((item) => item.field === field);
    if (timeItem) {
      const timeValue = timeItem.value;
      criteria.splice(criteria.indexOf(timeItem), 1);
      criteria.push({
        field: `${field}Numeric`,
        value: { [operator]: convertTimeToNumber(timeValue) },
      });
    }
  };

  handleTimeCondition("endTime", "$lte");
  handleTimeCondition("startTime", "$gte");

  // Build the final result based on join value
  if (join === "and") {
    const result = {};
    criteria.forEach((item) => (result[item.field] = item.value));
    return result;
  } else {
    const result = criteria.map((item) => ({ [item.field]: item.value }));
    return result;
  }
}

exports.getSearchController = async (req, res, next) => {
  let search_string = atob(decodeURIComponent(req.params.search));

  console.log(search_string);
  search_string = JSON.parse(search_string);
  let global_join = search_string.globalJoin;

  search_string = createSearchQuery(search_string);
  console.log(search_string);
  try {
    if (global_join === "and") {
      Swap.find(search_string)
        .sort("date")
        .exec((err, swap) => {
          if (err || !swap) {
            return res.status(400).json({
              error: "No Swaps found",
            });
          }

          res.json(swap);
        });
    } else {
      Swap.find({ $or: search_string })
        .sort("date")
        .exec((err, swap) => {
          if (err || !swap) {
            return res.status(400).json({
              error: "No Swaps found",
            });
          }

          res.json(swap);
        });
    }
  } catch (err) {
    console.error("No Swaps found");
    next(err);
  }
};
