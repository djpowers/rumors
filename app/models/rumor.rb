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
