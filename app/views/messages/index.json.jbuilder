json.messages   @messages.each do |message|
json.content    message.content
json.date       message.created_at.strftime("%Y/%m/%d %H:%M")
json.image      message.image
json.id         message.id
json.user_id    message.user.id
