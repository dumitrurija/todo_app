const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Get today's day index: 0 (Sunday) to 6 (Saturday)
const today = new Date();
const todayWeekday = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

// Convert Sunday from 0 to 7 so Monday becomes 1, Tuesday 2, ..., Sunday 7
const normalizedToday = todayWeekday === 0 ? 7 : todayWeekday;

// Return date string with days added to today
const getDatePlusDays = (daysToAdd) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};

const weekdays = [
  { id: 1, name: "Monday", bgColor: "#ffffff" },
  { id: 2, name: "Tuesday", bgColor: "#f9f9f9" },
  { id: 3, name: "Wednesday", bgColor: "#f2f2f2" },
  { id: 4, name: "Thursday", bgColor: "#ebebeb" },
  { id: 5, name: "Friday", bgColor: "#e4e4e4" },
  { id: 6, name: "Saturday", bgColor: "#dddddd" },
  { id: 7, name: "Sunday", bgColor: "#d6d6d6" }
];

const allData = weekdays.map((day, index) => {
  const offset = index + 1 - normalizedToday;
  return {
    ...day,
    isActive: offset === 0,
    date: getDatePlusDays(offset),
    tasks: []
  };
});

export { allData };