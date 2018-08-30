# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

##usersテーブル
|column|Type|Options|
|------|----|-------|
|name|string|null: false|
|group_id|integer|null: false|

### Association
- has_many :groups, through: :members
- has_many :messages
- accepts_nested_attributes_for :members
##groupsテーブル
|column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :members
- has_many :messages
- accepts_nested_attributes_for :members

##messagesテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|group_id|integer|null: false|
|text|text|null: false|

### Association

- belongs_to :user
- belongs_to :group

##membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
