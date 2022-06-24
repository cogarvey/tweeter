/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// takes in a tweet object and returns a tweet article 
$(document).ready(function() {

  // FUNCTION TO PREVENT XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // LOOPS THROUGH TWEETS, REMOVES DUPLICATES
  const renderTweets = function(tweets) {
    // remove duplicates
    $('.tweet-column').empty();
    // loop through tweets and prepend them
    for (let tweet of tweets) {
      $('.tweet-column').prepend(createTweetElement(tweet));
    }
  };


  // CREATE TWEET FUNCTION
  const createTweetElement = function(data) {
    let $tweet = $(`
      <article class="all-tweets">
      <header>
      <img src=${escape(data.user.avatars)}>
      <span>${escape(data.user.name)}</span>
      <span class="profile-handle">${escape(data.user.handle)}</span>
      </header>
      <div class="post-message">
      <div class="text">${escape(data.content.text)}</div>
      <div class="border"></div>
      </div>
      <footer class="post-info">
      <span class="post-time">${escape(timeago.format(data.created_at))}</span>
      <article class="post-icon">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
      </article>
      </footer>
      </article>
      `);
    return $tweet;
  };

  // TWEET LOADING FUNCTION
  const loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET',
      dataType: 'JSON',
      success: tweets => renderTweets(tweets),
      error: (data, text, error) => console.error("There is an error: ", error)
    });
  };
  loadTweets();

  // TWEET SUBMIT AND ERROR MESSAGES
  $('form').submit(function(event) {
    event.preventDefault();

    const textInput = $(".tweet-area").val();

    $('.tweet-error').slideUp();
    if (!textInput) {
      return $('.tweet-error').text("⚠There is no text, please enter text to tweet!⚠").slideDown();

    }
    if (textInput.length > 140) {
      return $('.tweet-error').text("⚠Tweet exceeds maximum character length⚠").slideDown();
    }

    $.ajax({
      method: "POST",
      url: '/tweets/',
      data: $(this).serialize(),
      success: () => {
        loadTweets();
        $(this).children('textarea').val('');
        $('.counter').text(140);
      },
      error: (data, text, error) => console.error("There is an error: ", error)
    });
  });
});
