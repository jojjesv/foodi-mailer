#!/bin/bash

CRED_PATH=/var/cred/foodicred

if [ -z $1 ]; then
  echo "Provide a tag"
  exit 1
fi

if [ ! -f $CRED_PATH ]; then
  echo "--> Cred path does not exist: $CRED_PATH"
  exit 1
fi

echo "--> Temporarily copying credentials and building image"

cp $CRED_PATH ./foodicred

docker build -t $1 .

echo "--> Removing credentials"
rm ./foodicred