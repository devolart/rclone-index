if [ -z "${PORT}" ]; then
    echo "No PORT env var, using 8080 port"
    PORT=8080
else
    echo "PORT env var found, using $PORT port"
fi

if [ -n "${CONFIG_BASE64}" ] || [ -n "${CONFIG_URL}" ]; then
    echo "Rclone config URL found"

    if [ -n "${CONFIG_BASE64}" ]; then
        echo "${CONFIG_BASE64}" | base64 -d > rclone.conf
    elif [ -n "${CONFIG_URL}" ]; then
        curl $CONFIG_URL > rclone.conf
    fi
    
    contents=$(cat rclone.conf)

    if ! echo "$contents" | grep -q "\[combine\]"; then
        remotes=$(echo "$contents" | grep '^\[' | sed 's/\[\(.*\)\]/\1/g')

        upstreams=""
        for remote in $remotes; do
            upstreams+="$remote=$remote: "
        done

        upstreams=${upstreams::-1}

        echo -e "\n\n[combine]\ntype = combine\nupstreams = $upstreams" >> rclone.conf
    fi

else
    echo "No Rclone config URL found, serving blank config"
    touch rclone.conf
fi

echo "Running rclone index"

if [ -n "${USERNAME}" ] && [ -n "${PASSWORD}" ]; then
    rclone serve http combine: --addr=:$PORT --user="$USERNAME" --pass="$PASSWORD" --read-only --config rclone.conf
else
    rclone serve http combine: --addr=:$PORT --read-only --config rclone.conf
fi
