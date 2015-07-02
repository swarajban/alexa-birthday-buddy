"use strict";

let moment = require('moment');

// Add a moment object for each 'raw' birthday object
// that has the next birthday after the current date
function getMomentBirthdays (currentMoment, birthdays) {
  return birthdays.map(
    function addMomentBirthday (birthday) {
      let momentBirthday = parse(birthday.date);
      momentBirthday.year(currentMoment.year());

      // need this to handle birthdays that are next year
      if (currentMoment.isAfter(momentBirthday)) {
        momentBirthday.year(currentMoment.year() + 1);
      }
      birthday.momentBirthday = momentBirthday;
      return birthday;
    }
  );
}

// Converts a date string that looks like 6/10/89 into a moment date
export function parse (dateString) {
  return moment(dateString, 'MM-DD-YYYY');
}

// Comparator to sort dates in ascending order
function compareMoments (a, b) {
  if (a.momentBirthday.isBefore(b.momentBirthday)) {
    return -1;
  } else if (a.momentBirthday.isAfter(b.momentBirthday)) {
    return 1;
  } else {
    return 0;
  }
}

// Returns an array of all birthdays on the next closest date
// after today
export function getNextBirthdays (currentMoment, birthdays) {
  let momentBirthdays = getMomentBirthdays(currentMoment, birthdays);

  // sort birthdays ascending
  momentBirthdays.sort(compareMoments);

  let nextBirthday = momentBirthdays[0];
  let nextBirthdays = [nextBirthday]; // add closest birthday!

  // Add all other birthdays on same day
  for (let i = 1; i < momentBirthdays.length; i++) {
    let currBirthday = momentBirthdays[i];
    if (nextBirthday.momentBirthday.isSame(currBirthday.momentBirthday)) {
      nextBirthdays.push(currBirthday);
    }
  }

  return nextBirthdays;
}
