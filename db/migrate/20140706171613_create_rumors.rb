class CreateRumors < ActiveRecord::Migration
  def change
    create_table :rumors do |t|
      t.text :body, null: false
      t.string :submitter
      t.integer :tweet_id, limit: 8
      t.timestamps
    end
  end
end
