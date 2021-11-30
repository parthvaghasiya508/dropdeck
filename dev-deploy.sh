#!/bin/bash

CLUSTER=$1
if [ -z "$CLUSTER" ]
  then
    echo "Usage: dev-deploy <image-tag>"
    exit
fi

gcloud config set project dropdeck-qa
./deploy.sh dev gke_dropdeck-qa_europe-west1-c_dev $1 "DEV  🔨" "https://dev.dropdeck.com"
