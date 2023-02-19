rm -Rf .git
# rm -Rf node_modules
# npm i
heroku create test-johnnychengsf
git init
heroku git:remote -a test-johnnychengsf
heroku addons:create cleardb:ignite
heroku config | grep CLEARDB_DATABASE_URL
heroku config:set USE_NPM_INSTALL=true
