class Rumor < ApplicationRecord
  validates :body, presence: true, length: { minimum: 10 }
end
