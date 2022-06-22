$(document).ready(function() {

  // WHEN INPUTTING TEXT IN THE TEXTAREA
  $('.new-tweet textarea').on('input', function() {

    // LENGTH OF WHAT IS BEING WRITTEN
    let tweetLengthCounter = $(this).val().length;

    // CHECK REMAINING CHARACTERS
    let remainingCharacters = 140 - tweetLengthCounter;

    // CHECK THE REMAINING ONCE CHARACTERS USED
    let counter = $(this).siblings('.counter');
    counter.text(remainingCharacters);

    // CHECK LENGTHS AND COMPARE FOR RED FONT
    if (remainingCharacters < 0) {
      counter.addClass('tweetIsTooLong');
    } else {
      counter.removeClass('tweetIsTooLong');
    }
  });
});