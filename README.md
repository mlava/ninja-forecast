ninja-forecast
==============

Ninja Blocks driver for forecast.io

A driver for Ninja Blocks to obtain up-to-date weather forecast data from the amazing team at Forecast.io.

Relies on the forecast.io wrapper created by mateodelnorte and available at https://github.com/mateodelnorte/forecast.io.git.

Beta dashboard gist depends on the skycons code from the Dark Sky Company at https://github.com/darkskyapp/skycons.git, and with thanks to Jeremy Manoto (jmanoto) for helping to get the gist working in beta dashboard as intended!

With thanks for the open nature of the Ninja Blocks platform and community.


Installation
================

    cd /opt/ninja/drivers
    git clone https://github.com/mlava/ninja-forecast
    cd ninja-forecast && npm install
    sudo service ninjablock restart



Note- Depending on the npm version on your device you might need to update npm with the following command:

    sudo npm install -g npm
    
Thanks @stormshaker!


Configuration
================

Select 'Drivers' in the ninja dashboard.

Select the ninja-forecast driver.

Add or remove your location via the menu.

Enter a suitable location name.

Obtain an API key from http://developer.forecast.io.

Enter your latitude and longitude.

Enter the frequency with which you want to check the forecast. Note that the free account at forecast.io entitles you to 1000 API calls daily; select an update frequency accordingly.

Select the units you want to receive data in. See http://developer.forecast.io/docs/v2 for an explanation of the options available.


Use
================

This driver will create a large number of widgets on the standard Ninja Blocks dashboard. Each widget should be named to describe which datapoint it is showing. ie. Temperature, Apparent Temperature, Dew Point, Humidity etc.

It isn't possible for me to create a widget for original NB dashboard that contains all of the devices, however a beta dashboard gist is available at https://gist.github.com/mlava/e392c74dfd401e22446e. You will need to assign all of the forecast.io devices to the widget in the beta dashboard to make it work.


Changelog
================

v0.2.0
First public version


Known issues
================

At present only one location can be defined in the config, or the devices won't update due to conflict between device guids.


To-do
================

1.	Update beta dashboard gist to automatically assign the correct units based on the units selected for download in config.
2.	Allow more than one location in config.
3. 	Update device ids to make more of the forecast.io datapoints available in the Ninja Blocks rules engine as sensors.
