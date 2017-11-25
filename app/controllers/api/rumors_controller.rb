class Api::RumorsController < ApplicationController
  def index
    @rumors = Rumor.all
  end
end
