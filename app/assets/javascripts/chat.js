$(function() {
  function buildHTML(message){
    if (message.image){
      var html = `
      <li class="chat_body">
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
        </div>
        <img src="${message.image}">
      </li>
      `
      return html;
    } else {
      var html =
        `<li class="chat_body" >
          <span class="user_name">
            ${message.name}
          </span>
          <span class="update_at">
            ${message.date}
          </span>
          <div class="message">
            <div class="message__content">
              ${message.content}
            </div>
          </div>
        </li>`;
      return html;

      }
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
      $('#message_content').val('');
      $('#message_image').val('');
      })
    .fail(function(data){
      alert('自動更新に失敗しました')
    })

    return false;
  })
})
