How to run
==========

Development `$ grunt serve`

Tests `$ grunt test:server watch`


Deployment
============

Application is hosted in heroku. [https://ukache-spotters-web.herokuapp.com/](https://ukache-spotters-web.herokuapp.com/)

To deploy

    $ grunt build
    $ grunt buildcontrol:heroku

MongoDB
-----

Right now is mongolab as it's free. Later we need to switch to mongohq $18 for 1GB


Deployment information
------------------------

Because you're using mongoose, you must add mongoDB to your heroku app.
        from `/dist`: heroku addons:add mongohq

You will need to set environment variables for facebook auth. From `/dist`:
        heroku config:set FACEBOOK_ID=appId
        heroku config:set FACEBOOK_SECRET=secret

You will need to set environment variables for google auth. From `/dist`:
        heroku config:set GOOGLE_ID=appId
        heroku config:set GOOGLE_SECRET=secret


Your app should now be live. To view it run
        cd dist && heroku open

You may need to address the issues mentioned above and restart the server for the app to work correctly.

After app modification run
        grunt build
Then deploy with
        grunt buildcontrol:heroku
