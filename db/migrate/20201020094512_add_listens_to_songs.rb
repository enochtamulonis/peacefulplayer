class AddListensToSongs < ActiveRecord::Migration[6.0]
  def change
    add_column :songs, :listens, :integer, null: false, default: 0
  end
end
