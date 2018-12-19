$(function() {
  function buildHTML(message){

    var insertImage =
      (message.image) ? `<img src="${message.image}">` : '';
      var html =
      `<li class="chat_body" >
        <span class="user_name">
          ${message.user_name}
        </span>
        <span class="update_at">
          ${message.date}
        </span>
        <div class="message">
          <div class="message__content">
            ${message.content}
          </div>
          ${insertImage}
        </div>
      </li>`;
      return html
    }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.chats').append(html);
      $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight}, 'fast');
      $("form")[0].reset();
      })
    .fail(function(data){
      alert('非同期投稿に失敗しました')
    })
    return false;
  })

  $(function(){
    var interval = setInterval(update, 5000);
  });

  function update(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var new_message = ($('.chat_body')[0]) ? ($('.chat_body:last').data('message-id')):0;

      $.ajax({
        url: location.href,
        type: 'GET',
        data: {  message: {id: new_message} },
        dataType: 'json',
      })
      .done(function(data){
        $.each(data, function(i, message){
            var html = buildHTML(message);
            $('.chats').append(html);
            $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function(data){
        alert('自動更新に失敗しました');
      });
    }
    else{
      clearInterval(interval);
    }
  }
})
