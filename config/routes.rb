Regex::Application.routes.draw do
  get "/", to: "application#index"
  get "/:zip", to: "application#zip", zip: /\d{5}/
  get "/:color", to: "application#color", color: /[0-9a-f]{6}/
end
