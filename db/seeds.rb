Rumor.delete_all

Rumor.create!(
  [
    {
      body: 'I heard a rumor that praesent pharetra sodales tellus, id vestibulum velit vulputate non.'
    },
    {
      body: 'Did you know that aenean vestibulum velit id urna placerat lacinia.',
      submitter: 'Rumor Guy'
    },
    {
      body: "I can't believe that cras lacus ligula, tincidunt a nulla ullamcorper, euismod sagittis felis."
    },
  ]
)

puts "Rumors seeded!"
