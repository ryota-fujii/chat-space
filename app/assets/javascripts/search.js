$(document).on('turbolinks:load',function() {

var search_list = $("#user-search-result");
var user_list = $("#chat-group-users");

function buildUser(user){
  var html = `
  <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
  </div>`
  search_list.append(html);
}

function buildNoUser(user){
  var html =`
  <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user}</p>
  </div>`
  search_list.append(html);
}

function addUserToGroup(id, name) {
  var html = `
  <div class='chat-group-user clearfix js-chat-member' id='chat-group-user'>
    <input name='group[user_ids][]' type='hidden' value='${id}'>
    <p class='chat-group-user__name'>${name}</p>
    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id=${id} >削除</a>
  </div>`
  user_list.append(html);
}

  $("#user-search-field").on("keyup", function() {
    var input = $.trim($(this).val());
    var reg =  RegExp(input);
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: {name: input},
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if ((users.length !== 0) && (input.length !== 0)) {
        $.each(users, function(i, user) {
          if (user.name.match(reg)){
            buildUser(user);
          }
        });
      }
      else{
        $("#user-search-result").empty();
        buildNoUser("該当するユーザーがありません");
      }
    })
    .fail(function(){
      alert('error');
    });
  });

  $("#user-search-result").on("click", ".user-search-add", function() {
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    addUserToGroup(user_id, user_name);
    $(this).parent().empty();
  });

  user_list.on("click", ".user-search-remove", function() {
    $(this).parent().empty();
  });
});
