$(function() {

var search_list = $("#user-search-result");

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
    // console.log(input);
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
    console.log(this);
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    console.log(user_id);
    console.log(user_name);
    var html = addUserToGroup(user_id, user_name);
    console.log(html);
    $('#chat-group-users').append(html);
    var parent = $(this).parent();
    $(parent).empty();
  });
});
