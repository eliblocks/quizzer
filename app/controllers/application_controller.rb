class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  respond_to :json

  def auth
    render json: current_user || {}
  end

  def check_user_authentication!
    return if current_user

    render json: { error: "not signed in" }, status: :unauthorized
  end
end
