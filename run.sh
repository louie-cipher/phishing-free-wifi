#!/bin/sh

CLIENT_DIR=/home/louie/phishing-free-wifi/client
SERVER_DIR=/home/louie/phishing-free-wifi/server

if [ "$1" = "init" ]; then
    cd $CLIENT_DIR
    npm install
    cd $SERVER_DIR
    npm install
    cd ..
    cp .env.example .env
    echo "Installation complete. Please edit the .env file and run the script again."
elif [ "$1" = "prod" ]; then
    screen -dmS "wifi-client" npm --prefix $CLIENT_DIR run prod &
    screen -dmS "wifi-server" npm --prefix $SERVER_DIR run prod
else
    screen -dmS "wifi-client" npm --prefix $CLIENT_DIR run dev &
    screen -dmS "wifi-server" npm --prefix $SERVER_DIR run dev
fi
