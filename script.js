function isLeapYear(year){

return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

}

function getDayOfWeek(day, month, year) {

const date = new Date(year, month - 1, day);

const days = [
"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
];

return days[date.getDay()];

}

function getDaysInMonth(month, year){

const days = [
31,
isLeapYear(year) ? 29 : 28,
31,
30,
31,
30,
31,
31,
30,
31,
30,
31
];

return days[month - 1];

}

function getZodiacSign(day, month) {

if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";

}

function getChineseZodiac(year) {

const animals = [
"Rat","Ox","Tiger","Rabbit","Dragon","Snake",
"Horse","Goat","Monkey","Rooster","Dog","Pig"
];

const index = ((year - 4) % 12 + 12) % 12;

return animals[index];

}

function calculateAge(day, month, year){

const today = new Date();

let age = today.getFullYear() - year;

const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();

if (
currentMonth < month ||
(currentMonth === month && currentDay < day)
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

if (today > nextBirthday){
nextBirthday.setFullYear(today.getFullYear() + 1);
}

const diffTime = nextBirthday - today;

const diffDays = Math.ceil(
diffTime / (1000 * 60 * 60 * 24)
);

return diffDays;

}

document.getElementById("birthdayForm").addEventListener("submit", function(event){

event.preventDefault();

const day = parseInt(document.getElementById("day").value);
const month = parseInt(document.getElementById("month").value);
const year = parseInt(document.getElementById("year").value);

const currentYear = new Date().getFullYear();

const error = document.getElementById("errorMessage");

const maxDay = getDaysInMonth(month, year);

if(
isNaN(day) || day < 1 || day > maxDay ||
isNaN(month) || month < 1 || month > 12 ||
isNaN(year) || year < 1900 || year > currentYear
){
error.textContent = "Check your input. Please enter a valid birth date.";
return;
}

error.textContent = "";

const dayOfWeek = getDayOfWeek(day, month, year);
const zodiac = getZodiacSign(day, month);
const chinese = getChineseZodiac(year);
const age = calculateAge(day, month, year);

const daysLeft = daysUntilBirthday(day, month);

document.getElementById("dayResult").textContent = dayOfWeek;
document.getElementById("zodiacResult").textContent = zodiac;
document.getElementById("chineseResult").textContent = chinese;
document.getElementById("ageResult").textContent = age;

document.getElementById("birthdayCountdown").textContent = daysLeft;

});
