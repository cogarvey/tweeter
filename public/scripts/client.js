/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// takes in a tweet object and returns a tweet article 
$(document).ready(function() {

  const renderTweets = function(tweets) {
    // remove duplicates
    $('.tweet-column').empty();
    // loop through tweets and prepend them
    for (let tweet of tweets) {
      $('.tweet-column').prepend(createTweetElement(tweet));
    }
  };


  const createTweetElement = function(data) {
    let $tweet = $(`
      <article class="all-tweets">
      <header>
      <img src=${data.user.avatars}>
      <span>${data.user.name}</span>
      <span class="profile-handle">${data.user.handle}</span>
      </header>
      <div class="post-message">
      <div class="text">${data.content.text}</div>
      <div class="border"></div>
      </div>
      <footer class="post-info">
      <span class="post-time">${timeago.format(data.created_at)}</span>
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
  let loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET',
      dataType: 'JSON',
      success: tweets => renderTweets(tweets),
      error: (data, text, error) => console.error("There is an error: ", error)
    });
  };
  loadTweets();

  

  
  $('form').submit(function(event) {
    event.preventDefault();

    let textInput = $(".tweet-area").val();

    if (!textInput) {
      console.log("There is no text!")
      return("There is no text!");
    }
    if (textInput.length > 140) {
      console.log("Tweet exceeds maximum character length")
      return("Tweet exceeds maximum character length");
    }

    $.ajax({
      method: "POST",
      url: '/tweets/',
      data: $(this).serialize()
    })
    .then(function(tweet) {
      loadTweets()
    })
    .catch((err) => {
      console.error("There was an error: ", err)
    })
  });
});
  