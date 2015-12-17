# eHealth
Diagnostic order and report application on SMART Platform

## Set Up for Diagnostic Report App

> Working directory for Diagnostic Report App is diagnostic_report

###Install node and node package management



```
sudo apt-get install node nodejs nodejs-legacy npm
```


###Install dependencies

1. change directory to diagnostic report working directory

2. install all dependencies that is listed in requires.txt

```
npm install < requires.txt
```

###Set SMART App config

1. create a new app in smart platform (clinical)
2. set the clinical_client_id, clinical_client_secret, clinical_launch_uri, clinical_redirect_uri value in diagnostic_report/controllers/configs.js.

> Information for your app registry
> 
> Launch uri should be like your_server_uri/
> 
> Redirect uri should be like your_server_uri/fhir-app/launch.html


### Run server program

Run the program in diagnostic report working directory

```
npm start
```
