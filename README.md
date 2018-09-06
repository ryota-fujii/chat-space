# README

## usersテーブル
|column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|text|null: false|

### Association
- has_many :groups, through: :members
- has_many :messages
- has_many :members
- accepts_nested_attributes_for :members
## groupsテーブル
|column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :members
- has_many :messages
- has_many :members
- accepts_nested_attributes_for :members

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|group_id|integer|null: false|
|text|text|
|image|text|

### Association

- belongs_to :user
- belongs_to :group

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
