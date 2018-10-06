class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.integer :user_id, null:false
      t.integer :group_id, null:false
      t.text :text
      t.text :image
      t.timestamps
    end
  end
end
