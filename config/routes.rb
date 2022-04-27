Rails.application.routes.draw do
  devise_for :users

  get "/auth", to: 'application#auth'
  
  resources :quizzes, only: [:index, :show, :create, :update, :destroy ]
  resources :quizzes do
    patch 'publish', on: :member
    post 'score', on: :member
  end
end
