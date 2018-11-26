$(function() {

var search_list = $("#user-search-result");

function appendUser(user){
  var html = `
  <div id="chat-group-users">
       <input name="chat_group[user_ids][]", type="hidden", value="22"}>
      <p class="chat-group-user__name">${name}</p>
    </div>
  </div>`
  search_list.append(html);
}

// function appendNoUser() {
//   var html ='';
//   search_list.append(html);
// }

  $("#user-search-field.chat-group-form__input").on("keyup", function(e){
    e.preventDefault();
    var input = $.trim($(this).val());
    console.log(input);
    $.ajax({
      type: 'GET',
      url: 'user/search',
      data: {keyword: input},
      dataType: 'json'
    })
    console.log("ajax")

    .done(function(data) {
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.foreach(function(user){
          appendUser(user);
        });
      }
    })
    .fail(function(){
      alert('error');
    });
  });
});
