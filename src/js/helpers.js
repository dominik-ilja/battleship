/**
 * @param {number} [min = 0] lowest number to be returned
 * @param {number} [max = 10] highest number to be returned
 * @param {object} [options = {round: false, place: null}] if we want to round number and to what place
 * @returns {number} number generated between min and max
 * @desc Generates a number between min and max. Is inclusive of min and max.
 */

function generateRandomNumber(min = 0, max = 10, options = { round: false, place: null }) {
  if (min > max) throw new Error('min cannot be greater than max');

  let randomNum = Math.random() * (max - min) + min;
  const { round, place } = options;

  if (round && typeof place === 'number') {
    if (options.place > 20) throw new Error('Place must be between 0 & 20');
    randomNum = +randomNum.toFixed(options.place);
  }
  return randomNum;
}

exports.generateRandomNumber = generateRandomNumber;
