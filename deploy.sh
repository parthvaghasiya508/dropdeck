#!/bin/bash

CLUSTER=$1
if [ -z "$CLUSTER" ]
  then
    echo "Usage: deploy <name-of-cluster> <context> <image-tag>"
    exit
fi

CONTEXT=$2
if [ -z "$CONTEXT" ]
  then
    echo "Usage: deploy <name-of-cluster> <context> <image-tag>"
    exit
fi

IMAGE_TAG=$3
if [ -z "$IMAGE_TAG" ]
  then
    echo "Usage: deploy <name-of-cluster> <context> <image-tag>"
    exit
fi

ENV_NAME=$4
ENV_LINK=$5

echo "Switching context to $CONTEXT"
kubectl config use-context $CONTEXT

echo "Updating the Helm deployment in the $CLUSTER cluster with image tag '$IMAGE_TAG'"

helm dep up deployment/helm/dropdeck
RESULT=$?
if [ $RESULT -eq 1 ]; then
  echo "Deployment aborted: Failed to update Helm charts"
  exit
fi

helm upgrade --install --namespace default default deployment/helm/dropdeck \
--set dropdeck-app.image.tag=$IMAGE_TAG \
--set dropdeck-app-server.image.tag=$IMAGE_TAG \
--set dropdeck-api.image.tag=$IMAGE_TAG \
--set dropdeck-export-app.image.tag=$IMAGE_TAG \
--set dropdeck-export-api.image.tag=$IMAGE_TAG \
-f deployment/clusters/$CLUSTER/values.yaml

RESULT=$?
if [ $RESULT -eq 1 ]; then
  echo "Deployment aborted: Failed to deploy cluster"
  exit
fi

# Send a notification to Slack
SLACK_WEBHOOK=https://hooks.slack.com/services/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
GIT_USER_NAME=$(git config user.name)
IMAGE_TAG_DISPLAY=$(echo $IMAGE_TAG | cut -c1-6)
MESSAGE="'*$GIT_USER_NAME* has deployed build \`$IMAGE_TAG_DISPLAY\` (<https://github.com/dropdeck-com/dropdeck/commit/$IMAGE_TAG|Git commit>) to <$ENV_LINK|*$ENV_NAME*>'"
PAYLOAD="{ 'blocks': [{'type': 'section', 'text': { 'type': 'mrkdwn', 'text': $MESSAGE} }]}"
curl -X POST -H 'Content-type: application/json' --data "$PAYLOAD" $SLACK_WEBHOOK
