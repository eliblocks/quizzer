class Question < ApplicationRecord
  belongs_to :quiz
  has_many :answers, dependent: :destroy

  def correct?(answer_ids)
  end
end
