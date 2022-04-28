class PublishedQuizzesController < ApplicationController
  def score
    @quiz = Quiz.find(params[:id])
    render json: { correct: @quiz.score(params[:answers])}
  end

  def published_quiz
    @quiz = Quiz.find(params[:id])

    render json: @quiz, include: { questions: { include: { answers: { except: :correct }}}}
  end
end
