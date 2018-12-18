if @new_message.present?
  json.array! @new_message.each do |message|
      json.user_name      message.user.name
      json.content        message.content
      json.date           message.created_at.strftime("%Y/%m/%d %H:%M")
      json.image          message.image.url
      json.id             message.id
  end
end
