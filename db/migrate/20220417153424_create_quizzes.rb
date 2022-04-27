class CreateQuizzes < ActiveRecord::Migration[7.0]
  def change
    create_table :quizzes do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.boolean :published, null: false, default: false

      t.timestamps
    end
  end
end
