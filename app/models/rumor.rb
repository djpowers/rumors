class Rumor < ApplicationRecord
  validates :body, presence: true, length: { minimum: 10 }

  @client = Twitter::REST::Client.new do |config|
    config.consumer_key = ENV['YOUR_CONSUMER_KEY']
    config.consumer_secret = ENV['YOUR_CONSUMER_SECRET']
  end

  def self.add_twitter_rumors
    @client.search('#patkellyrumors -rt', result_type: 'recent').collect do |tweet|
      Rumor.find_or_create_by(body: tweet.text, submitter: tweet.user.screen_name) do |rumor|
        rumor.tweet_id = tweet.id
        rumor.created_at = tweet.created_at
      end
    end
  end
end
