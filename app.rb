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

class Rumor < ActiveRecord::Base
  validates :body, presence: true, length: { minimum: 5 }
  validates :submitter, length: { minimum: 2 }, allow_blank: true

  @client = Twitter::REST::Client.new do |config|
    config.consumer_key = ENV['YOUR_CONSUMER_KEY']
    config.consumer_secret = ENV['YOUR_CONSUMER_SECRET']
  end

  def self.add_twitter_rumors
    @client.search('#patkellyrumors -rt', result_type: 'recent').take(3).collect do |tweet|
      Rumor.find_or_create_by(body: tweet.text, submitter: tweet.user.screen_name) do |rumor|
        rumor.tweet_id = tweet.id
      end
    end
  end
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
