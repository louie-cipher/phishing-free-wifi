CLIENT_DIR=~/phishing-free-wifi/client
SERVER_DIR=~/phishing-free-wifi/server

#check if nodejs and npm is installed
if [ ! -x "$(command -v node)" ] || [ ! -x "$(command -v npm)" ]; then
    echo "Error: nodejs/npm not installed" >&2
    echo "Please install nodejs and npm first" >&2
    echo "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash" >&2
    exit 1
fi

# check if screen is installed
if ! [ -x "$(command -v screen)" ]; then
    echo "Error: screen is not installed" >&2
    echo "sudo apt install screen" >&2
    exit 1
fi

if [ "$1" = "install" ]; then
    npm --prefix $CLIENT_DIR install
    npm --prefix $SERVER_DIR install
    if [ -f .env ]; then
        echo ".env already exists. Skip copying"
    else
        cp .env.example .env
        echo "edit .env file"
    fi
elif [ "$1" = "build" ]; then
    npm --prefix $CLIENT_DIR run build
    npm --prefix $SERVER_DIR run build
elif [ "$1" = "dev" ]; then
    screen -dmS "wifi-client" npm --prefix $CLIENT_DIR run dev &
    screen -dmS "wifi-server" npm --prefix $SERVER_DIR run dev
else
    #check if server/node_modules and client/node_modules exists
    if [ ! -d "$CLIENT_DIR/node_modules" ] || [ ! -d "$SERVER_DIR/node_modules" ]; then
        read -p "No node_modules found. Install now? [y/n] " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            npm --prefix $CLIENT_DIR i
            npm --prefix $SERVER_DIR i
            echo "modules installed. Proceeding"
        else
            echo "Please run './run.sh install' first"
            exit 1
        fi
    fi

    # check if server/dist and client/dist exists
    if [ ! -d "$CLIENT_DIR/dist" ] || [ ! -d "$SERVER_DIR/dist" ]; then
        read -p "No dist found. Compile now? [y/n] " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            npm --prefix $CLIENT_DIR run build
            npm --prefix $SERVER_DIR run build
            echo "dist compiled. Proceeding"
        else
            echo "Please run './run.sh build' first"
            exit 1
        fi
    fi
    screen -dmS "wifi-client" npm --prefix $CLIENT_DIR start &
    screen -dmS "wifi-server" npm --prefix $SERVER_DIR start

    echo "run 'screen -r wifi-client' to see client logs"
    echo "run 'screen -r wifi-server' to see server logs"
fi
