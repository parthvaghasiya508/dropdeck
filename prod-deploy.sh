#!/bin/bash

CLUSTER=$1
if [ -z "$CLUSTER" ]
  then
    echo "Usage: preview-deploy <image-tag>"
    exit
fi

read -p "You are about to make changes to the PRODUCTION environment. Do you want to continue? (y/N)? " choice
case "$choice" in
  y|Y ) CONTINUE=1;;
  n|N ) CONTINUE=0;;
  * ) CONTINUE=0;;
esac

if [ $CONTINUE -eq 0 ]; then
  echo "Deployment aborted"
  exit
fi

gcloud config set project dropdeck
./deploy.sh preview gke_dropdeck_europe-west1-b_preview $1 "PROD  🚀" "https://app.dropdeck.com"
