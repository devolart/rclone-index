if [ ! -f rclone ]; then
    echo "No rclone executable found, installing first"
    curl -O https://downloads.rclone.org/rclone-current-linux-amd64.zip
    unzip rclone-current-linux-amd64.zip
    cp rclone-*-linux-amd64/rclone .
    rm -rf rclone-*
    chmod +x rclone
else
    echo "Rclone executable found"
fi

if [ -z "${PORT}" ]; then
    echo "No PORT env var, using 8080 port"
    PORT=8080
else
    echo "PORT env var found, using $PORT port"
fi

if [ -n "${CONFIG_URL}" ]; then
    echo "Rclone config URL found"
    curl $CONFIG_URL > rclone.conf
else
    echo "No Rclone config URL found, serving blank config"
    touch rclone.conf
fi

echo "Running rclone index"

if [ -n "${USERNAME}" ] && [ -n "${PASSWORD}" ]; then
    ./rclone rcd --rc-serve --rc-addr=:$PORT --rc-user="$USERNAME" --rc-pass="$PASSWORD" --config rclone.conf
else
    ./rclone rcd --rc-serve --rc-addr=:$PORT --config rclone.conf
fi