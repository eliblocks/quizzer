class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  respond_to :json

  def auth
    render json: current_user || {}
  end
end
