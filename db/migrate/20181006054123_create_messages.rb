class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.references :group, foreign_key: true
      t.references :user, foreign_key: true
      t.text :content
      t.text :image
      t.timestamps
    end
  end
end
