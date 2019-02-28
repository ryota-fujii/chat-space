class UsersController < ApplicationController
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def search
    @users = User.where('name LIKE(?) AND id NOT IN (?)', "%#{params[:name]}%", exclude_user)
    respond_to do |format|
      format.html
      format.json
    end
  end

  private

  def exclude_user
    user_ids = []
    user_ids << current_user.id
    params[:members].map {  |user| user_ids << user.to_i}
    return user_ids
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
