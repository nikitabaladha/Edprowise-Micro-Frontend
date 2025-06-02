// src/utils/numberToWords.js

export const formatCost = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(value);
};

const convertToWords = (n) => {
  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const thousands = ["", "Thousand", "Million", "Billion"];

  if (n === 0) return "Zero Rs only";

  let words = "";

  // Function to convert a number less than 1000 to words
  function convertLessThanThousand(num) {
    let str = "";

    if (num >= 100) {
      str += units[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }
    if (num >= 20) {
      str += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    }
    if (num > 0) {
      str += units[num] + " ";
    }
    return str.trim();
  }

  let group = 0;
  while (n > 0) {
    let chunk = n % 1000;
    if (chunk > 0) {
      words =
        convertLessThanThousand(chunk) + " " + thousands[group] + " " + words;
    }
    n = Math.floor(n / 1000);
    group++;
  }

  return words.trim();
};

export default convertToWords;
