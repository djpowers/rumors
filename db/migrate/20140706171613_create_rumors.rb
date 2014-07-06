class CreateRumors < ActiveRecord::Migration
  def change
    create_table :rumors do |t|
      t.text :body, null: false
      t.string :submitter
      t.timestamps
    end
  end
end
