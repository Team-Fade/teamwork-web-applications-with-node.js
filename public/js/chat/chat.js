// let socket = io.connect('http://localhost:3000/chat');
//       socket.on('news', function(data) {
//         console.log(data);
//         socket.emit('my other event', { my: 'data' });
// });
/* globals $ io */

$(function() {
  const FADE_TIME = 150; // ms
  const TYPING_TIMER_LENGTH = 400; // ms
  const COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7',
  ];

  // Initialize variables
  const $window = $(window);
  const $usernameInput = $('.usernameInput'); // Input for username
  const $messages = $('.messages'); // Messages area
  const $inputMessage = $('.inputMessage'); // Input message input box

  const $loginPage = $('.login-page'); // The login page
  const $chatPage = $('.chat-page'); // The chatroom page

  // Prompt for setting a username
  let username;
  let connected = false;
  let typing = false;
  let lastTypingTime;
  let $currentInput = $usernameInput.focus();

  const socket = io();

  function addParticipantsMessage(data) {
    let message = '';
    if (data.numUsers === 1) {
      message += 'there\'s 1 participant';
    } else {
      message += 'there are ' + data.numUsers + ' participants';
    }
    log(message);
  }

  // Sets the client's username
  function setUsername() {
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit('add user', username);
    }
  }

  // Sends a chat message
  function sendMessage() {
    let message = $inputMessage.val();
    // Prevent markup from being injected into the message
    message = cleanInput(message);
    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message,
      });

      socket.emit('new message', message);
    }
  }

  function log(message, options) {
    const $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  // Adds the visual chat message to the message list
  function addChatMessage(data, options) {
    // Don't fade the message in if there is an 'X was typing'
    const $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    const $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    const $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    const typingClass = data.typing ? 'typing' : '';
    const $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }

  // Adds the visual chat typing message
  function addChatTyping(data) {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  function removeChatTyping(data) {
    getTypingMessages(data).fadeOut(function() {
      $(this).remove();
    });
  }

  function addMessageElement(el, options) {
    const $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput(input) {
    return $('<div/>').text(input).text();
  }

  // Updates the typing event
  function updateTyping() {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function() {
        const typingTimer = (new Date()).getTime();
        const timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  function getTypingMessages(data) {
    return $('.typing.message').filter(function(i) {
      return $(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  function getUsernameColor(username) {
    let hash = 7;
    for (let i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }

    const index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  $window.keydown(function(event) {
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }

    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', function() {
    updateTyping();
  });

  $loginPage.click(function() {
    $currentInput.focus();
  });

  $inputMessage.click(function() {
    $inputMessage.focus();
  });

  socket.on('login', function(data) {
    connected = true;
    const message = 'Welcome to Team-Fade chat powered by Socket.io';
    log(message, {
      prepend: true,
    });
    addParticipantsMessage(data);
  });

  socket.on('new message', function(data) {
    addChatMessage(data);
  });

  socket.on('user joined', function(data) {
    log(data.username + ' joined');
    addParticipantsMessage(data);
  });

  socket.on('user left', function(data) {
    log(data.username + ' left');
    addParticipantsMessage(data);
    removeChatTyping(data);
  });

  socket.on('typing', function(data) {
    addChatTyping(data);
  });

  socket.on('stop typing', function(data) {
    removeChatTyping(data);
  });

  socket.on('disconnect', function() {
    log('you have been disconnected');
  });

  socket.on('reconnect', function() {
    log('you have been reconnected');
    if (username) {
      socket.emit('add user', username);
    }
  });

  socket.on('reconnect_error', function() {
    log('attempt to reconnect has failed');
  });
});