$(function() {
  function buildHTML(message){
    console.log('たどり着いた？')
    if (message.image){
      var html = `<img src="${message.image}">`
      console.log("めっせ");
      return html;
    } else {
      var html =
        `<li class="chat_body" data-message-id=${message.id}>
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
      console.log('めっせーじさくせい');
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
      console.log("成功");
      var html = buildHTML(data);
      $('.chats').append(html);
      console.log("ついか？");
      $('#message_content').val('');
      $('#message_image').val('');
      // $('form')[0].reset();
      })
    .fail(function(data){
      alert('自動更新に失敗しました')
    })

    return false;
  })
})
