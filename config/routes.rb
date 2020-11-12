Rails.application.routes.draw do
  resources :songs
  get 'pages/home'
  root to:'songs#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
