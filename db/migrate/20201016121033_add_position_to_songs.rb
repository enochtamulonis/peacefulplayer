class AddPositionToSongs < ActiveRecord::Migration[6.0]
  def change
    add_column :songs, :position, :integer
  end
end
