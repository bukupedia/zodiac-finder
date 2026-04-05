(() => {

// Zodiac signs with date ranges (Western zodiac)
const zodiacSigns = [
  { sign: "Capricorn", start: [12,22], end:[1,19] },
  { sign: "Aquarius", start: [1,20], end:[2,18] },
  { sign: "Pisces", start: [2,19], end:[3,20] },
  { sign: "Aries", start: [3,21], end:[4,19] },
  { sign: "Taurus", start: [4,20], end:[5,20] },
  { sign: "Gemini", start: [5,21], end:[6,20] },
  { sign: "Cancer", start: [6,21], end:[7,22] },
  { sign: "Leo", start: [7,23], end:[8,22] },
  { sign: "Virgo", start: [8,23], end:[9,22] },
  { sign: "Libra", start: [9,23], end:[10,22] },
  { sign: "Scorpio", start: [10,23], end:[11,21] },
  { sign: "Sagittarius", start: [11,22], end:[12,21] }
];

// Western Zodiac sign lookup
function getZodiacSign(day, month) {
  // Sanitize inputs - ensure positive integers
  day = Math.floor(Math.max(1, Math.abs(Number(day) || 0)));
  month = Math.floor(Math.max(1, Math.abs(Number(month) || 0)));
  
  for (const {sign, start, end} of zodiacSigns) {
    if(
      (month === start[0] && day >= start[1]) ||
      (month === end[0] && day <= end[1])
    ){
      return escapeHtml(sign);
    }
  }
  return "Unknown";
}

// Chinese Zodiac animals
function getChineseZodiac(year) {
  const animals = [
    "Rat","Ox","Tiger","Rabbit","Dragon","Snake",
    "Horse","Goat","Monkey","Rooster","Dog","Pig"
  ];

  // Sanitize year input
  const sanitizedYear = Math.floor(Math.abs(Number(year) || 0));
  
  const index = ((sanitizedYear - 4) % 12 + 12) % 12;
  return escapeHtml(animals[index]);
}

// Get days in a given month/year (handles leap years)
function getDaysInMonth(month, year) {
  const sanitizedMonth = Math.floor(Math.max(1, Math.min(12, Math.abs(Number(month) || 1))));
  const sanitizedYear = Math.floor(Math.abs(Number(year) || 2024));
  return new Date(sanitizedYear, sanitizedMonth, 0).getDate();
}

// Get day of week from date
function getDayOfWeek(day, month, year) {
  const sanitizedDay = Math.floor(Math.abs(Number(day) || 1));
  const sanitizedMonth = Math.floor(Math.abs(Number(month) || 1));
  const sanitizedYear = Math.floor(Math.abs(Number(year) || 2024));
  
  const date = new Date(sanitizedYear, sanitizedMonth - 1, sanitizedDay);
  const days = [
    "Sunday","Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday"
  ];
  return escapeHtml(days[date.getDay()]);
}

// Calculate age from birthdate
function calculateAge(day, month, year, today = new Date()) {
  const sanitizedDay = Math.floor(Math.abs(Number(day) || 1));
  const sanitizedMonth = Math.floor(Math.abs(Number(month) || 1));
  const sanitizedYear = Math.floor(Math.abs(Number(year) || 2000));
  
  let age = today.getFullYear() - sanitizedYear;

  if(
    today.getMonth() + 1 < sanitizedMonth ||
    (today.getMonth() + 1 === sanitizedMonth && today.getDate() < sanitizedDay)
  ){
    age--;
  }

  return Math.max(0, Math.min(age, 150)); // Reasonable age bounds
}

// Calculate days until next birthday
function daysUntilBirthday(day, month) {
  const sanitizedDay = Math.floor(Math.abs(Number(day) || 1));
  const sanitizedMonth = Math.floor(Math.abs(Number(month) || 1));
  const today = new Date();

  let nextBirthday = new Date(
    today.getFullYear(),
    sanitizedMonth - 1,
    sanitizedDay
  );

  if(today > nextBirthday){
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const diff = nextBirthday - today;
  return Math.max(0, Math.ceil(diff / 86400000));
}

// XSS prevention - escape HTML special characters
function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  const div = document.createElement('div');
  div.textContent = String(text);
  return div.innerHTML;
}

// Validate input values
function validateInput(day, month, year) {
  const errors = [];
  const currentYear = new Date().getFullYear();
  const minYear = 1900;
  const maxYear = currentYear;
  
  const dayNum = Number(day);
  const monthNum = Number(month);
  const yearNum = Number(year);
  
  // Check for NaN
  if (Number.isNaN(dayNum) || Number.isNaN(monthNum) || Number.isNaN(yearNum)) {
    return { valid: false, error: "All fields are required and must be numbers." };
  }
  
  // Validate ranges
  if (monthNum < 1 || monthNum > 12) {
    errors.push("Month must be between 1 and 12.");
  }
  
  if (yearNum < minYear || yearNum > maxYear) {
    errors.push(`Year must be between ${minYear} and ${maxYear}.`);
  }
  
  // Check valid day for the specific month/year
  if (monthNum >= 1 && monthNum <= 12 && yearNum >= minYear && yearNum <= maxYear) {
    const maxDay = getDaysInMonth(monthNum, yearNum);
    if (dayNum < 1 || dayNum > maxDay) {
      errors.push(`Day must be between 1 and ${maxDay} for the selected month.`);
    }
  }
  
  if (errors.length > 0) {
    return { valid: false, error: errors.join(" ") };
  }
  
  return { valid: true, error: "" };
}

// DOM elements
const form = document.getElementById("birthdayForm");

const elements = {
  error: document.getElementById("errorMessage"),
  dayResult: document.getElementById("dayResult"),
  zodiacResult: document.getElementById("zodiacResult"),
  chineseResult: document.getElementById("chineseResult"),
  ageResult: document.getElementById("ageResult"),
  birthdayCountdown: document.getElementById("birthdayCountdown"),
  resultContent: document.getElementById("resultContent"),
  placeholderMessage: document.getElementById("placeholderMessage")
};

// Clear previous results
function clearResults() {
  elements.error.textContent = "";
  elements.dayResult.textContent = "";
  elements.zodiacResult.textContent = "";
  elements.chineseResult.textContent = "";
  elements.ageResult.textContent = "";
  elements.birthdayCountdown.textContent = "";
  elements.resultContent.hidden = true;
  elements.placeholderMessage.hidden = false;
}

// Show results
function showResults(data) {
  elements.error.textContent = "";
  elements.dayResult.textContent = data.dayOfWeek;
  elements.zodiacResult.textContent = data.zodiac;
  elements.chineseResult.textContent = data.chinese;
  elements.ageResult.textContent = data.age;
  elements.birthdayCountdown.textContent = data.daysLeft;
  
  elements.resultContent.hidden = false;
  elements.placeholderMessage.hidden = true;
}

// Show error
function showError(message) {
  elements.error.textContent = message;
  elements.resultContent.hidden = true;
  elements.placeholderMessage.hidden = true;
}

// Form submission handler
form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  // Clear previous state
  clearResults();

  // Get and sanitize input values
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  
  const day = dayInput.value.trim();
  const month = monthInput.value.trim();
  const year = yearInput.value.trim();

  // Validate inputs
  const validation = validateInput(day, month, year);
  
  if (!validation.valid) {
    showError(validation.error);
    return;
  }

  // Convert to numbers after validation
  const dayNum = Number(day);
  const monthNum = Number(month);
  const yearNum = Number(year);

  // Calculate results
  const dayOfWeek = getDayOfWeek(dayNum, monthNum, yearNum);
  const zodiac = getZodiacSign(dayNum, monthNum);
  const chinese = getChineseZodiac(yearNum);
  const age = calculateAge(dayNum, monthNum, yearNum);
  const daysLeft = daysUntilBirthday(dayNum, monthNum);

  // Display results
  showResults({
    dayOfWeek,
    zodiac,
    chinese,
    age,
    daysLeft
  });
});

// Reset button handler
form.addEventListener("reset", (event) => {
  clearResults();
});

// Real-time input validation
const inputs = [
  document.getElementById("day"),
  document.getElementById("month"),
  document.getElementById("year")
];

inputs.forEach(input => {
  input.addEventListener("input", () => {
    // Clear error when user starts typing
    elements.error.textContent = "";
  });
});

})();
