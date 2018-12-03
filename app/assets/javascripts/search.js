$(function() {

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

function buildNoUser(user) {
  var html ='';
  search_list.append(html);
}

function addUserToGroup(id, name) {
  var html = `
  <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
    <input name='group[user_ids][]' type='hidden' value='${id}'>
    <p class='chat-group-user__name'>${name}</p>
    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
  </div>`
  return html;

}

function deleteUserFromGroup(user){
  var html
}
  $(".chat-group-form__input").on("keyup", function() {
    var input = $.trim($(this).val());
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          buildUser(user);
        });
      }
      else {
        buildNoUser("一致するユーザーは存在しません");
      }
    })
    .fail(function(){
      alert('error');
    });
  });

  $("#user-search-result").on("click", ".user-search-add", function() {
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    var html = addUserToGroup(user_id, user_name);
    user_list.append(html);
    var parent = $(this).parent();
    $(parent).empty();
  });

  user_list.on("click", ".user-search-remove", function() {
    var parent = $(this).parent();
    $(parent).empty();
  });
});
