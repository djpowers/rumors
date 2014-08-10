# Rumors

A Sinatra application which accepts posts via a submission form or via Twitter hashtag.

- [Active Record](http://guides.rubyonrails.org/active_record_querying.html)
using [sinatra-activerecord](https://github.com/janko-m/sinatra-activerecord)
- [PostgreSQL](http://www.postgresql.org/) for a database
- [RSpec](https://github.com/rspec/rspec) for unit testing
- [Capybara](https://github.com/jnicklas/capybara) for acceptance testing
- [Pry](https://github.com/pry/pry) for debugging

To use, ensure Twitter API credentials are set as environment variables.

For using Heroku console, first enter ```require './app.rb'``` per the instructions at [Running a Heroku Console](http://mikeebert.tumblr.com/post/29941784481/running-a-sinatra-console)
