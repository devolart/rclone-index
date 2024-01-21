# rclone-index
Deploy rclone index for your cloud storages easily

Keep in mind that there are already some other rclone index repositories out there that you can deploy for yourself, this repository is mainly my own approach for that purpose. To name a few of those repositories: (these repositories may be old, but they should still work)

1. https://github.com/developeranaz/RCLONE-SERVE-INDEX
2. https://github.com/culturecloud/rclone-index
3. https://github.com/iamdjsai9999/Multi-Cloud-Index

## Environment variables
1. `PORT` (Optional, default: 8080)

Server port you want to use for rclone index.

2. `CONFIG_URL`

Raw rclone config URL. You can use https://gist.github.com, create a hidden gist, paste your rclone.conf content, save it, and copy the raw URL of that gist.

3. `USERNAME` (Optional)

Username for authentication (leave blank for no auth). It must be paired with `PASSWORD` variable if you want to add authentication.

4. `PASSWORD` (Optional)

Password for authentication (leave blank for no auth). It must be paired with `USERNAME` variable if you want to add authentication.

## Deployments

### Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/devolart/rclone-index)

### Scalingo
[![Deploy on Scalingo](https://cdn.scalingo.com/deploy/button.svg)](https://dashboard.scalingo.com/create/app?source=https://github.com/devolart/rclone-index)

### Render
Make a new web service, use `https://github.com/devolart/rclone-index` as GitHub template, add environment variables, and deploy it

### Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/dEP4Kk)

### Glitch
[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button-v2.svg)](https://glitch.com/edit/#!/remix/https://glitch.com/~rclone-index)

After remixing, edit `.env` file to add environment variables.