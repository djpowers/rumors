require 'sinatra'
require 'sinatra/activerecord'
require 'rack/csrf'
require 'sinatra/flash'
require 'sinatra/redirect_with_flash'
require 'will_paginate'
require 'will_paginate/active_record'
require 'pry'
require 'dotenv'
require 'twitter'

configure do
  set :views, 'app/views'

  Dotenv.load

  enable :sessions
  set :session_secret, ENV['SESSION_KEY']
  use Rack::Csrf, raise: true

  I18n.enforce_available_locales = false
end

Dir[File.join(File.dirname(__FILE__), 'app', '**', '*.rb')].each do |file|
  require file
end

helpers do
  def csrf_token
    Rack::Csrf.csrf_token(env)
  end

  def csrf_tag
    Rack::Csrf.csrf_tag(env)
  end
end

get '/' do
  Rumor.add_twitter_rumors
  @title = "Pat Kelly Rumors"
  @rumors = Rumor.order("created_at DESC").paginate(page: params[:page], per_page: 25)
  erb :index
end

post '/rumors' do
  @rumor = Rumor.new(params[:rumor])
  if @rumor.save
    redirect '/', notice: 'Thanks for sharing the juicy gossip!'
  else
    redirect '/', error: 'Something went wrong. Try again.'
  end
end
