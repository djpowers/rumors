class Api::RumorsController < ApplicationController
  def index
    @rumors = Rumor.all
  end

  def create
    @rumor = Rumor.create(params.require(:rumor).permit(:body, :submitter))
    if @rumor.save
      @rumor
    end
  end
end
