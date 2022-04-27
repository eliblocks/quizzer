class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :answers, through: :questions

  validates :title, presence: true, length: { minimum: 3 }

  def score(answer_ids)
    questions.select do |question|
      question.answers.where(correct: true).ids == question.answer_ids.intersection(answer_ids)
    end.count
  end
end
