json.rumors @rumors do |rumor|
  json.id rumor.id
  json.body rumor.body
  json.submitter rumor.submitter
  json.tweetId rumor.tweet_id
  json.displayTime rumor.created_at.in_time_zone('US/Eastern').strftime('%I:%M %p %b %e, %Y')
  json.createdAt rumor.created_at.to_i
end

json.totalCount @rumors.total_entries
