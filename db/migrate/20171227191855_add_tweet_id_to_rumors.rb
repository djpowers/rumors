class AddTweetIdToRumors < ActiveRecord::Migration[5.1]
  def change
    add_column :rumors, :tweet_id, :string
  end
end
