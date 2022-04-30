class AddExternalIdToQuiz < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :external_id, :string
  end
end
