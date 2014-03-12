class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
    @type = "homepage"
  end

  def color
    @alert = "Your color is #{params[:color]}"
    @color = "##{params[:color]}"
    render "index"
  end

  def zip
    @alert = "Your ZIP is #{params[:zip]}"
    @zip = params[:zip]
    render "index"
  end
end
