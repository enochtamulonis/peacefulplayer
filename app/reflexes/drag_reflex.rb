# frozen_string_literal: true

class DragReflex < ApplicationReflex

  def sort
    songs = JSON.parse(element.dataset.songs)
    songs.each do |song|
      song_element = Song.find(song['id'])
      song_element.update(position: song['position'])
      song_element.save
    end
    morph :nothing
  end

end
