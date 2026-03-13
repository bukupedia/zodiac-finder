(() => {

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

function getZodiacSign(day, month) {
  for (const {sign,start,end} of zodiacSigns) {
    if(
      (month === start[0] && day >= start[1]) ||
      (month === end[0] && day <= end[1])
    ){
      return sign;
    }
  }
}

function getChineseZodiac(year){
  const animals = [
    "Rat","Ox","Tiger","Rabbit","Dragon","Snake",
    "Horse","Goat","Monkey","Rooster","Dog","Pig"
  ];

  const index = ((year - 4) % 12 + 12) % 12;
  return animals[index];
}

function getDaysInMonth(month, year){
  return new Date(year, month, 0).getDate();
}

function getDayOfWeek(day, month, year){
  const date = new Date(year, month - 1, day);
  const days = [
    "Sunday","Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday"
  ];
  return days[date.getDay()];
}

function calculateAge(day, month, year, today = new Date()){
  let age = today.getFullYear() - year;

  if(
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day)
  ){
    age--;
  }

  return age;
}

function daysUntilBirthday(day, month){
  const today = new Date();

  let nextBirthday = new Date(
    today.getFullYear(),
    month - 1,
    day
  );

  if(today > nextBirthday){
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const diff = nextBirthday - today;
  return Math.ceil(diff / 86400000);
}

const form = document.getElementById("birthdayForm");

const elements = {
  error: document.getElementById("errorMessage"),
  dayResult: document.getElementById("dayResult"),
  zodiacResult: document.getElementById("zodiacResult"),
  chineseResult: document.getElementById("chineseResult"),
  ageResult: document.getElementById("ageResult"),
  birthdayCountdown: document.getElementById("birthdayCountdown")
};

form.addEventListener("submit", (event) => {

  event.preventDefault();

  const day = Number(document.getElementById("day").value);
  const month = Number(document.getElementById("month").value);
  const year = Number(document.getElementById("year").value);

  const currentYear = new Date().getFullYear();
  const maxDay = getDaysInMonth(month, year);

  if(
    Number.isNaN(day) || day < 1 || day > maxDay ||
    Number.isNaN(month) || month < 1 || month > 12 ||
    Number.isNaN(year) || year < 1900 || year > currentYear
  ){
    elements.error.textContent =
      "Check your input. Please enter a valid birth date.";
    return;
  }

  elements.error.textContent = "";

  const dayOfWeek = getDayOfWeek(day, month, year);
  const zodiac = getZodiacSign(day, month);
  const chinese = getChineseZodiac(year);
  const age = calculateAge(day, month, year);
  const daysLeft = daysUntilBirthday(day, month);

  elements.dayResult.textContent = dayOfWeek;
  elements.zodiacResult.textContent = zodiac;
  elements.chineseResult.textContent = chinese;
  elements.ageResult.textContent = age;
  elements.birthdayCountdown.textContent = daysLeft;

});

})();
