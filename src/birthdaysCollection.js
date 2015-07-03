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
    },
    {
      "name": "Raunak",
      "date": "2/13/1989"
    },
    {
      "name": "Mavian",
      "date": "12/27/1988"
    },
    {
      "name": "Somya",
      "date": "3/1/1989"
    },
    {
      "name": "Tabeer",
      "date": "7/3/1989"
    },
    {
      "name": "Nupur",
      "date": "3/6/1989"
    },
    {
      "name": "Rricha",
      "date": "8/13/1987"
    },
    {
      "name": "Ravi",
      "date": "8/22/1989"
    },
    {
      "name": "Chetan",
      "date": "1/22/1989"
    },
    {
      "name": "Shore",
      "date": "6/14/1989"
    },
    {
      "name": "Akash",
      "date": "11/12/1989"
    },
    {
      "name": "Akash Pradhan",
      "date": "8/20/1989"
    },
    {
      "name": "Deepti",
      "date": "11/24/1989"
    },
    {
      "name": "Puneet",
      "date": "/24/1989"
    },
    {
      "name": "Sunil",
      "date": "4/25/1989"
    },
    {
      "name": "Long",
      "date": "10/6/1988"
    },
    {
      "name": "Pragya",
      "date": "10/26/1988"
    },
    {
      "name": "Deepak",
      "date": "11/7/1988"
    },
    {
      "name": "Swaraj's Mom",
      "date": "10/12/1961"
    },
    {
      "name": "Anurati's Dad",
      "pronounced": "Uhhnooruhthee's Dad",
      "date": "7/29/1955"
    },
    {
      "name": "Anurati's Mom",
      "pronounced": "Uhhnooruhthee's Mom",
      "date": "2/23/1961"
    },
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

