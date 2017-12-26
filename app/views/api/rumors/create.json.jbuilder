json.rumor do
  json.id @rumor.id
  json.body @rumor.body
  json.submitter @rumor.submitter
  json.displayTime @rumor.created_at.in_time_zone('US/Eastern').strftime('%I:%M %p %b %e, %Y')
end
