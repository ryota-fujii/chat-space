class User < ApplicationRecord

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :groups, through: :members
  has_many :messages
  has_many :members
  accepts_nested_attributes_for :members
end
