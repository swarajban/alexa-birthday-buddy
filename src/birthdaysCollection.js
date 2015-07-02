"use strict";

// TODO: Store in some cloud db
export function getBirthdays () {
  return [
    {
      "name": "Swaraj",
      "date": "6/10/1989"
    },
    {
      "name": "Anurati",
      "pronounced": "Uhhnooruhthee",
      "date": "12/5/1988"
    },
    {
      "name": "Swaraj's Dad",
      "date": "7/17/1960"
    }
  ];
}

// Returns the birthday's name. Returns the pronounced
// field if it exists
export function getBirthdayName (birthday) {
  if (birthday.pronounced) {
    return birthday.pronounced;
  } else {
    return birthday.name;
  }
}

