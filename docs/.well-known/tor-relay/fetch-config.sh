#!/bin/sh

# instructions:
# set up a cron job to run this script every 10 minutes on relay host, one cron job per instance
# curl https://null-f.org/.well-known/tor-relay/fetch-config.sh | bash -s -- granite 00

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <nickname> <instance>"
    exit 1
fi

# params
NICKNAME="$1"
INSTANCE="$2"

if [ -d $INSTANCE ]; then
  echo "Single-instance deployment detected."
  TORRC_LOCATION="/etc/tor/torrc"
  TORRC_TEMP_LOCATION="/etc/tor/torrc.tmp"
  SOURCE_URL="https://null-f.org/.well-known/tor-relay/deployments/$NICKNAME.txt"
else
  echo "Multi-instance deployment detected."
  TORRC_LOCATION="/etc/tor/instances/$INSTANCE/torrc"
  TORRC_TEMP_LOCATION="/etc/tor/instances/$INSTANCE/torrc.tmp"
  SOURCE_URL="https://null-f.org/.well-known/tor-relay/deployments/$NICKNAME-$INSTANCE.txt"
fi

echo $TORRC_LOCATION
echo $SOURCE_URL

if [ -d "$TORRC_LOCATION" ]; then
  echo "Fatal: $TORRC_LOCATION does exist."
  exit 0
fi

touch -f $TORRC_TEMP_LOCATION

curl -s $SOURCE_URL > $TORRC_TEMP_LOCATION

if (git diff --no-index --quiet $TORRC_TEMP_LOCATION $TORRC_LOCATION) then 
   echo "$NICKNAME $INSTANCE: No changes detected, quitting fetch script..."
   rm $TORRC_TEMP_LOCATION
   exit 0;
else
   echo "Changes detected, applying..."
   mv $TORRC_TEMP_LOCATION $TORRC_LOCATION

  if [ -d $INSTANCE ]; then
    echo "Reloading only Tor instance..."
    service tor reload
  else
    echo "Reloading Tor instance $INSTANCE..."
    service tor@$INSTANCE reload
  fi
fi
