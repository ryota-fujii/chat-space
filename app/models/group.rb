class Group < ApplicationRecord
  has_many :users, through: :members
  has_many :messages
  has_many :members
  accepts_nested_attributes_for :members
end
