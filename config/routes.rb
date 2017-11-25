Rails.application.routes.draw do
  root to: "pages#home"
  namespace :api, defaults: { format: :json } do
    resources :rumors, only: [ :index ]
  end
end
