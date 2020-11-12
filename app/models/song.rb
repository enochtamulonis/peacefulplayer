class Song < ApplicationRecord
  acts_as_list
  has_one_attached :mp3_file
end
