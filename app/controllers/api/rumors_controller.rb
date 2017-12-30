class Api::RumorsController < ApplicationController
  def index
    @rumors = Rumor.reorder('created_at DESC').paginate(page: params[:page], per_page: params[:per_page])
  end

  def create
    @rumor = Rumor.create(params.require(:rumor).permit(:body, :submitter))
    if @rumor.save
      @rumor
    end
  end
end
