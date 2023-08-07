'use strict';
/////////////////////
// SELCTING DOM ELEMENTS

const dice = $('.dice');
const btnNew = $('.btn--new');
const btnRoll = $('.btn--roll');
const btnHold = $('.btn--hold');
const player0 = $('#player--0');
const player1 = $('#player--1');
const score0 = $('#score--0');
const score1 = $('#score--1');

///////////////////
// VAR GAME

let isWin = false;
let activePlayer = 0;
let currentScore = 0;
let fixScore = [0, 0];

// FUNTIONS GAME

const suitchUser = function () {
  currentScore = 0;
  $(`#current--${activePlayer}`).text(currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  $('.player--0').toggleClass('player--active');
  $('.player--1').toggleClass('player--active');
};

//////////////////
// LOGIC

// ROLL DICE

btnRoll.click(function () {
  if (!isWin) {
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    dice.removeClass('hidden');
    dice.attr('src', `dice-${randomDice}.png`);
    if (randomDice !== 1) {
      currentScore += randomDice;
      $(`#current--${activePlayer}`).text(currentScore);
    } else {
      suitchUser();
    }
  }
});

// HOlD

btnHold.click(function () {
  if (!isWin) {
    fixScore[activePlayer] += currentScore;
    console.log(fixScore);
    $(`#score--${activePlayer}`).text(fixScore[activePlayer]);
    if (fixScore[activePlayer] >= 20) {
      $(`.player--${activePlayer}`).addClass('player--winner');
      isWin = true;
      $(`#name--${activePlayer}`).text('winner!');
      $('.dice').addClass('hidden');
    } else {
      suitchUser();
    }
  }
});

//NEW

btnNew.click(function () {
  $(`.player--${activePlayer}`).removeClass('player--winner');
  isWin = false;
  fixScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0.text(fixScore[0]);
  score1.text(fixScore[1]);
  if (!$('.dice').hasClass('hidden')) {
    $('.dice').addClass('hidden');
  }
  $('#name--0').text('player 1');
  $('#name--1').text('player 2');

  $('#current--0').text(currentScore);
  $('#current--1').text(currentScore);
  $(`.player--${activePlayer}`).addClass('player--active');
  $('.player--1').removeClass('player--active');
});
