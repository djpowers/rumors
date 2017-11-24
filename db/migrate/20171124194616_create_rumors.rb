class CreateRumors < ActiveRecord::Migration[5.1]
  def change
    create_table :rumors do |t|
      t.text :body, null: false
      t.string :submitter

      t.timestamps
    end
  end
end
