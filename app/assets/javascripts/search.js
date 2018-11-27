$(function() {

var search_list = $("#user-search-result");

function appendUser(user){
  var html = `
  <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add", data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
  </div>`
  search_list.append(html);
}

function appendNoUser(user) {
  var html ='';
  search_list.append(html);
}

  $(".chat-group-form__input").on("keyup", function() {
    var input = $.trim($(this).val());
    console.log(input);
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users) {
      console.log(users)
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーは存在しません");
      }
    })
    .fail(function(){
      alert('error');
    });
  });
});
