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

  var interval;

  $(function(){
    interval = setInterval(update, 5000);
  });

  function update(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      if($('.chat_body')[0]){
        var message_id = $('.chat_body:last').data('message-id');
      }else{
        var message_id = 0;
      }

      console.log(message_id);
      $.ajax({
        url: location.href.json,
        type: 'GET',
        data: {
          message: {id: message_id}
        },
        dataType: 'json',
      })
      .done(function(data){
        console.log(data);
        var insertHTML = '';
        $.each(data, function(i, message){
          insertHTML += buildHTML(message);
        });
        $('.chats').html(insertHTML);
        $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight}, 'fast');
      })
      .fail(function(data){
        alert('自動更新に失敗しました');
      });
    } else{
      clearInterval(interval);
    }
  }


})
