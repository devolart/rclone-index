# rclone-index
Deploy rclone index for your cloud storages easily

> Keep in mind that there are already some other rclone index repositories out there that you can deploy for yourself, this repository is mainly my own approach for that purpose. To name a few of those repositories: (these repositories may be old, but they should still work)
> 1. https://github.com/developeranaz/RCLONE-SERVE-INDEX
> 2. https://github.com/culturecloud/rclone-index
> 3. https://github.com/iamdjsai9999/Multi-Cloud-Index

## Features
- [x] Multiple rclone remotes in one index
- [x] No colons in URL (following [MLTB](https://github.com/anasty17/mirror-leech-telegram-bot) method), unlike the default behavior of other similar repos 
- [x] Light mode and dark mode
- [x] Easy deployment
- [x] Docker and VPS supported (even for no-root environment)
- [x] Many PaaS platforms supported (some are even free)
- [x] Loading rclone configs via base64 or GitHub Gist link
- [x] Authentication supported

## Demo Site
https://demo.rclone-index.workers.dev/

## Environment variables
1. `CONFIG_BASE64` (mandatory, select one)

> [!NOTE]
> IMPORTANT: Select one between `CONFIG_BASE64` or `CONFIG_URL`. `CONFIG_BASE64` is recommended because it doesn't expose your rclone config as a link. Use this if you want maximum security.

Rclone config that has been encoded with base64. You can use https://emn178.github.io/online-tools/base64_encode.html to encode your rclone.conf content, copy the encoded config, and paste it to this variable.

2. `CONFIG_URL` (mandatory, select one)

> [!NOTE]
> IMPORTANT: Select one between `CONFIG_BASE64` or `CONFIG_URL`. `CONFIG_URL` is not recommended because it exposes your config as a link, even though the chance people may stumble into your link is very little as it is a private gist.

Raw rclone config URL. You can use https://gist.github.com, create a secret gist, paste your rclone.conf content, save it, and copy the raw URL of that gist.

3. `PORT` (Optional)

Server port you want to use for rclone index. If you use PaaS, it's most likely that PORT variable has been assigned by default, so you can leave this blank first to check. If you don't specify and the server you use doesn't assign PORT variable automatically, it will use 8080 port.

4. `USERNAME` (Optional)

Username for authentication (leave blank for no auth). It must be paired with `PASSWORD` variable if you want to add authentication.

5. `PASSWORD` (Optional)

Password for authentication (leave blank for no auth). It must be paired with `USERNAME` variable if you want to add authentication.

6. `DARK_MODE` (Optional)

Set this to `true` to enable dark mode. Leaving this empty or any value other than `true` will set it to light mode. You can also edit the dark mode's template at `templates/dark.html`. Thanks to [@culturecloud](https://github.com/culturecloud) for the dark mode template (I couldn't find it anywhere else)

Light mode (default):
![Light mode](https://cdn.glitch.global/5816d3a4-231f-47f8-8ba8-ef67edfc0885/light%20index.png)

Dark mode:
![Dark mode](https://cdn.glitch.global/5816d3a4-231f-47f8-8ba8-ef67edfc0885/dark%20index.png)

## Deployments
### Docker
You need to make sure that Docker is installed in your server
1. Clone this repo
```
git clone https://github.com/devolart/rclone-index
```
2. Open the cloned repo directory
```
cd rclone-index
```
3. Build the docker
```
sudo docker build . -t rclone-index
```
4. Copy this command, modify the environment variables (remove if needed), and run it
```
sudo docker run -e CONFIG_BASE64= -e CONFIG_URL= -e PORT=8080 -e USERNAME= -e PASSWORD= -e DARK_MODE=false -p 8080:8080 rclone-index
```
### VPS (without root)
1. Copy these commands and modify the environment variables (remove if needed)
```
export CONFIG_BASE64=
export CONFIG_URL=
export PORT=8080
export USERNAME=
export PASSWORD=
export DARK_MODE=false
```
2. Run this command
```
curl https://raw.githubusercontent.com/devolart/rclone-index/main/start.sh | bash
```
### Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/devolart/rclone-index)

### Scalingo
[![Deploy on Scalingo](https://cdn.scalingo.com/deploy/button.svg)](https://dashboard.scalingo.com/create/app?source=https://github.com/devolart/rclone-index#main)

### Render
Make a new web service, use `https://github.com/devolart/rclone-index` as GitHub template, add environment variables (don't add PORT variable), and deploy it

### Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/dEP4Kk)

### Glitch
<b>Unfortunately, the original project has been suspended on Glitch</b>

### Koyeb
[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?type=git&repository=github.com/devolart/rclone-index&branch=main&name=rclone-index)

### Clever Cloud
Fork this repo, connect your Clever Cloud account to the forked repo, add environment variables (don't add PORT variable), and deploy it

### Northflank
Make a new service, use `https://github.com/devolart/rclone-index` as GitHub template, add environment variables (set the port to 8080), expose 8080 port as HTTP to the internet, and deploy it

## Support Group
[![Telegram Channel](https://img.shields.io/static/v1?label=Join&message=Telegram%20Channel&color=blue&style=for-the-badge&logo=telegram&logoColor=blue)](https://t.me/tearflakes)


[![Telegram Group](https://img.shields.io/static/v1?label=Join&message=Telegram%20Group&color=blue&style=for-the-badge&logo=telegram&logoColor=blue)](https://t.me/tearflakeschat)

## Credits
1. [Rclone](https://rclone.org) for the amazing tool
2. Other users who have created rclone index repos before
3. [@devolart](https://github.com/devolart) for making this approach of Rclone index
