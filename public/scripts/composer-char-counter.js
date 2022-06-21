$(document).ready(function() {

  // WHEN INPUTTING TEXT IN THE TEXTAREA
  $('.new-tweet textarea').on('input', function() {

    // LENGTH OF WHAT IS BEING WRITTEN
    let tweetLengthCounter = $(this).val().length;

    // CHECK THE REMAINING ONCE CHARACTERS USED
    let counterRemain = $(this).siblings('.counter');

    // CHARACTER LIMIT
    let tweetLimit = 140;

    // CHECK LENGTHS AND COMPARE
    if (tweetLengthCounter > tweetLimit) {
      counterRemain.addClass('tweetIsTooLong');
    } else if (tweetLengthCounter <= tweetLimit) {
      counterRemain.removeClass('tweetIsTooLong');
    }
    counterRemain.text(tweetLimit - tweetLengthCounter);
  });
});