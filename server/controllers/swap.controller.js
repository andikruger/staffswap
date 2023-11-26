const Swap = require("../models/swap.model");

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
  } = req.body;
  console.log("Swap created");
  console.log(req.body);
  const newSwap = new Swap({
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
  } = req.body;
  const updatedSwap = await Swap.findByIdAndUpdate(id, {
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
  });
  res.status(200).json({
    message: "Swap updated successfully",
    data: updatedSwap,
  });
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
  let join = obj.globalJoin;
  let criteria = obj.searchCriteria;

  // if there is a searchCriteria called "threeLetterCode" then change its value to uppercase
  for (let index = 0; index < criteria.length; index++) {
    if (criteria[index].field === "threeLetterCode") {
      criteria[index].value = criteria[index].value.toUpperCase();
    }
  }

  // if there is a searchCriteria called "priority" then change its value to an integer
  for (let index = 0; index < criteria.length; index++) {
    if (criteria[index].field === "priority") {
      criteria[index].value = parseInt(criteria[index].value);
    }
  }

  if (join == "and") {
    let result = {};

    for (let index = 0; index < criteria.length; index++) {
      result[criteria[index].field] = criteria[index].value;
    }
    return result;
  } else {
    let result = [];

    for (let index = 0; index < criteria.length; index++) {
      let result_temp = {};
      result_temp[criteria[index].field] = criteria[index].value;
      result.push(result_temp);
    }

    return result;
  }
}

exports.getSearchController = async (req, res, next) => {
  let search_string = atob(decodeURIComponent(req.params.search));

  search_string = JSON.parse(search_string);
  let global_join = search_string.globalJoin;

  search_string = createSearchQuery(search_string);
  console.log(search_string);
  try {
    if (global_join === "and") {
      Swap.find(search_string)
        .sort("-createdAt")
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
        .sort("-createdAt")
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
