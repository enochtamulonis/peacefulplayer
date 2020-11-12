class SongReflex < ApplicationReflex
  def delete_song
    song = Song.find(element.dataset.id)
    song.destroy
  end

end
