function getDayOfWeek(day, month, year) {

const date = new Date(year, month - 1, day);

const days = [
"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
];

return days[date.getDay()];

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

const index = (year - 4) % 12;

return animals[index];

}

document.getElementById("birthdayForm").addEventListener("submit", function(event){

event.preventDefault();

const day = parseInt(document.getElementById("day").value);
const month = parseInt(document.getElementById("month").value);
const year = parseInt(document.getElementById("year").value);

const dayOfWeek = getDayOfWeek(day, month, year);
const zodiac = getZodiacSign(day, month);
const chinese = getChineseZodiac(year);

document.getElementById("dayResult").textContent = dayOfWeek;
document.getElementById("zodiacResult").textContent = zodiac;
document.getElementById("chineseResult").textContent = chinese;

});
