function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const result = new Date();
  result.setHours(hours, minutes, 0, 0);
  return result;
}

function findMatches(obj, arr) {
  let matches = new Set();

  // Iterate through the exchanges of the object
  for (let exchange of obj.exchanges) {
    // Iterate through the array of potential matches
    for (let swap of arr) {
      // Check if the dates are not the same
      if (obj.date !== swap.date) {
        // Convert exchange and swap start/end times to Date objects using formatTime
        const exchangeStartTime = formatTime(exchange.startTime);
        const exchangeEndTime = formatTime(exchange.endTime);
        const swapStartTime = formatTime(swap.startTime);
        const swapEndTime = formatTime(swap.endTime);

        // Calculate the start time with leeway
        const startTimeWithLeeway = new Date(exchangeStartTime);
        startTimeWithLeeway.setHours(startTimeWithLeeway.getHours() - 1);

        // Calculate the end time with leeway
        const endTimeWithLeeway = new Date(exchangeEndTime);
        endTimeWithLeeway.setHours(endTimeWithLeeway.getHours() + 1);

        // Check if the potential match's start time falls within the exchange's time range with leeway
        if (
          startTimeWithLeeway <= swapStartTime &&
          swapStartTime <= exchangeEndTime
        ) {
          // Check if the potential match's end time falls within the exchange's time range with leeway
          if (
            startTimeWithLeeway <= swapEndTime &&
            swapEndTime <= endTimeWithLeeway
          ) {
            // Calculate the quality of the match
            let quality = 0;

            // Check if the start time matches exactly
            if (+exchangeStartTime === +swapStartTime) {
              quality += 1;
            } else {
              quality -= 0.5; // Starts an hour earlier
            }

            // Check if the end time matches exactly
            if (+exchangeEndTime === +swapEndTime) {
              quality += 1;
            } else {
              quality -= 0.5; // Ends an hour later
            }

            // Check if the duration matches exactly
            if (+exchange.duration === +swap.duration) {
              quality += 1;
            } else {
              quality -= 0.5; // Duration mismatch
            }

            // Calculate the difference in hours between the swap and the exchange
            const hoursDifference = Math.abs(
              (swapEndTime - swapStartTime) / (60 * 60 * 1000) -
                (exchangeEndTime - exchangeStartTime) / (60 * 60 * 1000)
            );

            // Determine if the swap has more or fewer hours
            const hoursVerdict =
              hoursDifference === 0
                ? "Exact duration"
                : swapEndTime - swapStartTime >
                  exchangeEndTime - exchangeStartTime
                ? "More hours"
                : "Fewer hours";

            // Determine if leeway was considered
            const leewayConsidered =
              swapStartTime >= startTimeWithLeeway &&
              swapEndTime <= endTimeWithLeeway;

            // Create a match object with quality and verdict
            const match = {
              swap: swap,
              quality: quality,
              verdict: {
                hours: hoursVerdict,
                leewayConsidered: leewayConsidered,
              },
            };

            // Add the match to the Set
            matches.add(JSON.stringify(match));
          }
        }
      }
    }
  }

  // Convert Set to array and sort matches by quality in descending order
  const uniqueMatches = Array.from(matches).map((match) => JSON.parse(match));
  uniqueMatches.sort((a, b) => b.quality - a.quality);

  // Return unique matches
  return uniqueMatches.map((match) => ({
    swap: match.swap,
    quality: match.quality,
    verdict: match.verdict,
  }));
}

const obja = {
  _id: "655b3380eb80a48174a7670d",
  userID: "6550721764d6cce9fe822413",
  name: "Andreas Krüger",
  threeLetterCode: "AKR",
  date: "2023-11-22T00:00:00.000Z",
  startTime: "06:00",
  endTime: "14:30",
  shiftWish: "Frühdienst",
  qualifications: ["PS B1/B2", "PS B2"],
  duration: "8.5",
  note: "",
  exchanges: [
    {
      date: "2023-11-23",
      startTime: "08:00",
      endTime: "20:00",
    },
    {
      date: "2023-11-25",
      startTime: "05:00",
      endTime: "17:00",
    },
  ],
  priority: 1,
  status: "Pending",
  createdAt: "2023-11-20T10:22:56.093Z",
  updatedAt: "2023-11-20T10:22:56.093Z",
  __v: 0,
};

const arrb = [
  {
    _id: "655b3380eb80a48174a7670d",
    userID: "6550721764d6cce9fe822413",
    name: "Andreas Krüger",
    threeLetterCode: "AKR",
    date: "2023-11-22T00:00:00.000Z",
    startTime: "06:00",
    endTime: "14:30",
    shiftWish: "Frühdienst",
    qualifications: ["PS B1/B2", "PS B2"],
    duration: "8.5",
    note: "",
    exchanges: [
      {
        date: "2023-11-23",
        startTime: "08:00",
        endTime: "20:00",
      },
      {
        date: "2023-11-25",
        startTime: "05:00",
        endTime: "17:00",
      },
    ],
    priority: 1,
    status: "Pending",
    createdAt: "2023-11-20T10:22:56.093Z",
    updatedAt: "2023-11-20T10:22:56.093Z",
    __v: 0,
  },
  {
    _id: "655b33d7eb80a48174a76715",
    userID: "6550721764d6cce9fe822413",
    name: "Kobus van der Merwe",
    threeLetterCode: "KVM",
    date: "2023-11-22T00:00:00.000Z",
    startTime: "06:00",
    endTime: "18:00",
    shiftWish: "Frühdienst",
    qualifications: ["PS B1/B2", "PS B2"],
    duration: "12",
    note: "",
    exchanges: [
      {
        date: "2023-11-24",
        startTime: "06:00",
        endTime: "18:00",
      },
    ],
    priority: 1,
    status: "Pending",
    createdAt: "2023-11-20T10:24:23.675Z",
    updatedAt: "2023-11-20T10:24:23.675Z",
    __v: 0,
  },
  {
    _id: "655b3568b64a777b6d6cccb0",
    userID: "6550721764d6cce9fe822413",
    name: "Kobus van der Merwe",
    threeLetterCode: "KVM",
    date: "2023-11-23T00:00:00.000Z",
    startTime: "09:00",
    endTime: "18:00",
    shiftWish: "Frühdienst",
    qualifications: ["PS B2", "PS B1/B2"],
    duration: "9",
    note: "",
    exchanges: [],
    priority: 1,
    status: "Pending",
    createdAt: "2023-11-20T10:31:04.590Z",
    updatedAt: "2023-11-20T10:31:04.590Z",
    __v: 0,
  },
  {
    _id: "655b41d4b64a777b6d6cccb9",
    userID: "6550721764d6cce9fe822413",
    name: "Suzelle Swanepoel",
    threeLetterCode: "SUZ",
    date: "2023-11-25T00:00:00.000Z",
    startTime: "06:00",
    endTime: "14:30",
    shiftWish: "Frühdienst",
    qualifications: ["PS B1/B2"],
    duration: "8.5",
    note: "",
    exchanges: [
      {
        date: "2023-11-29",
        startTime: "08:00",
        endTime: "19:00",
      },
    ],
    priority: 1,
    status: "Pending",
    createdAt: "2023-11-20T11:24:04.767Z",
    updatedAt: "2023-11-20T11:24:04.767Z",
    __v: 0,
  },
];

let test = findMatches(obja, arrb);

console.log(test);
