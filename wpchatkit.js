(function($) {

var storage = {currentRoom: "public", currentUser: null}

$("#inRoom").text("#"+storage.currentRoom);

var chatroom = new WP_Chatkit('/'+window.location.hostname);

var username = chatroom.auth(prompt("What's your name?"), function(username) {
  chatroom.connect(username);
  storage.currentUser = username;
  $(".currentUser").text(username);
  $(".currentUserAvatar").attr("src", "https://avatars.dicebear.com/api/initials/"+username+".svg");
});

chatroom.joinRoom({user: username, room: storage.currentRoom}, function(data) {
  var message_html = $('.comment-blank').clone();
  $(message_html).find(".author").hide();
  $(message_html).find(".text").text(data);
  $(message_html).removeClass("comment-blank hidden").addClass("user-joined")
  $('.comments').prepend(message_html);
  console.log(data);
});

chatroom.disconnect( function(data) {
  var message_html = $('.comment-blank').clone();
  $(message_html).find(".author").hide();
  $(message_html).find(".text").text(data);
  $(message_html).removeClass("comment-blank hidden");
  $('.comments').prepend(message_html);
});

chatroom.onlineUsers(function(online) {
  $(".online-users").empty();
  $.each(online, function(index, user) {
    console.log(storage.currentUser);
    if(user.username !== storage.currentUser) {
      $(".online-users").prepend($("<a/>").text(user.username).attr("href", user.username+"-"+username).addClass("item text-gray-500"));
    }
  });
});

chatroom.messages(function(message) {
  var message_html = $('.comment-blank').clone();
  $(message_html).find(".author").text(message.user);
  $(message_html).find(".text").html(message.msg);
  $(message_html).removeClass("comment-blank hidden").addClass("comment");
  $('.comments').prepend(message_html);
});

$(".send-message svg").on("click", function(e) {
  chatroom.sendMessage({user: username, msg: $(".input").html(), room: storage.currentRoom})
  //$(".input").data("emojioneArea").setText('');
  $(".input").empty()
});

$('body').on('click', '.rooms a', function(e) {
  var __this = $(this);
  room = __this.attr("href");
  storage.currentRoom = room;
  $("#inRoom").text("#"+storage.currentRoom);
  $('.comment, .user-joined').remove();

  chatroom.changeRoom({room: room}, function(data) {
    console.log(data);
    console.log(room);
  });
  e.preventDefault();
});

$('body').on('click', '.online-users .menu .item', function(e) {
  e.preventDefault();
  var __this = $(this);
  room = __this.attr("href");
  if(room === username+"-"+username) {
    alert("you can not direct message yourself.");
    return;
  }
  storage.currentRoom = room;
  $("#inRoom").text("#"+storage.currentRoom);
  $('.comment, .user-joined').remove();
  chatroom.changeRoom({room: room}, function(data) {
    console.log(data);
  });
});

$(document).ready(function() {
   /*$("input").emojioneArea();*/
  });

})( jQuery );


