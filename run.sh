#!/bin/bash

CLIENT_DIR=/home/louie/phishing-free-wifi/client
SERVER_DIR=/home/louie/phishing-free-wifi/server

if [ "$1" = "init" ]; then
    cd $CLIENT_DIR
    /usr/bin/npm install
    cd $SERVER_DIR
    /usr/bin/npm install
    cd ..
    cp .env.example .env
elif [ "$1" = "prod" ]; then
    /usr/bin/screen -dmS "wifi-client" /usr/bin/npm --prefix $CLIENT_DIR run prod &
    /usr/bin/screen -dmS "wifi-server" /usr/bin/npm --prefix $SERVER_DIR run prod
else
    /usr/bin/screen -dmS "wifi-client" /usr/bin/npm --prefix $CLIENT_DIR run dev &
    /usr/bin/screen -dmS "wifi-server" /usr/bin/npm --prefix $SERVER_DIR run dev
fi
