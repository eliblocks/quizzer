class QuizzesController < ApplicationController
  before_action :check_user_authentication!

  def index
    render json: current_user.quizzes
  end

  def show
    @quiz = current_user.quizzes.find(params[:id])

    render json: @quiz, include: { questions: { include: :answers }}
  end

  def create
    ActiveRecord::Base.transaction do
      @quiz = current_user.quizzes.create(title: params[:title])
    end
    
    render json: @quiz
  end

  def publish
    @quiz = current_user.quizzes.find(params[:id])
    @quiz.update(published: true, external_id: SecureRandom.alphanumeric(6))

    render json: @quiz
  end

  def update
    @quiz = current_user.quizzes.find(params[:id])

    ActiveRecord::Base.transaction do
      @quiz.update(title: params[:title])
      @quiz.questions.each(&:destroy)

      params[:questions].each do |question|
        saved_question = @quiz.questions.create(
          body: question[:body],
          question_type: question[:question_type],
        )
        question[:answers].each do |answer|
          saved_question.answers.create(body: answer[:body], correct: answer[:correct])
        end
      end
    end
  end

  def destroy
    current_user.quizzes.find(params[:id]).destroy
  end
end
