#!/bin/bash

CONNECTION_STRING=$1
if [ -z "$CONNECTION_STRING" ]
  then
    echo "Usage: import <connection-string>"
    echo "Make sure the mongoimport binary is on your PATH"
    exit
fi

mongoimport --collection=branding --db=dropdeck $CONNECTION_STRING init-branding.json
mongoimport --collection=companies --db=dropdeck $CONNECTION_STRING init-companies.json
mongoimport --collection=settings --db=dropdeck $CONNECTION_STRING init-settings.json



