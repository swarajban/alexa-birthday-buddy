"use strict";


let birthday = require('../birthdays');
let moment = require('moment');
let assert = require('assert');

describe('Birthday tests',
  function birthdayTests () {

    describe('next birthday',
      function nextBirthdayTests () {
        it('should return next birthday when all next birthdays are in same year as today',
          function () {
            let today = birthday.parse('6/10/1989');
            var testBirthdays = [
              {
                name: 'before',
                date: '6/09/1989'
              },
              {
                name: 'next',
                date: '6/11/1989'
              },
              {
                name: 'later',
                date: '12/11/2000'
              }
            ];

            let {names, date} = birthday.getNextBirthdays(today, testBirthdays);
            assert.equal('next', names[0]);
          }
        );

        it('should return next birthday when next birthday is next year',
          function () {
            let today = birthday.parse('6/10/1989');
            var testBirthdays = [
              {
                name: 'before',
                date: '6/09/1989'
              },
              {
                name: 'next',
                date: '12/11/2000'
              }
            ];

            let {names, date} = birthday.getNextBirthdays(today, testBirthdays);
            assert.equal('next', names[0]);
          }
        );

        it('should return multiple next birthdays on the same day',
          function () {
            let today = birthday.parse('6/10/1989');
            var testBirthdays = [
              {
                name: 'next1',
                date: '6/11/1989'
              },
              {
                name: 'next2',
                date: '6/11/2000'
              }
            ];

            let {names, date} = birthday.getNextBirthdays(today, testBirthdays);
            assert.equal(2, names.length);
          }
        )
      }
    );
  }
);
