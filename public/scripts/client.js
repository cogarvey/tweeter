/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// takes in a tweet object and returns a tweet article 
$(document).ready(function() {

  
  // Fake data taken from initial-tweets.json
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
      }
    ]
    
    
    const renderTweets = function(tweets) {
      // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      // $('.tweet-column').empty();
      for (let tweet of tweets) {
        $('.tweet-column').append(createTweetElement(tweet))
      }
    }
    
    
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
    }
    


    /////////////////// TESTER /////////////////////
    // const tweetData = {
    //   "user": {
    //     "name": "Newton",
    //     "avatars": "https://i.imgur.com/73hZDYK.png",
    //     "handle": "@SirIsaac"
    //   },
    //   "content": {
    //     "text": "If I have seen further it is by standing on the shoulders of giants"
    //   },
    //   "created_at": 1461116232227
    // }
    
    // const $tweet = createTweetElement(tweetData);
    
    // // Test / driver code (temporary)
    // // console.log($tweet); // to see what it looks like
    // // $('.all-tweets').append($tweet);
    
    renderTweets(tweetData);
  });