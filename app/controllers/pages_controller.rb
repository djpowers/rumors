class PagesController < ApplicationController
  def home
    Rumor.add_twitter_rumors
  end
end
