FROM alpine
RUN apk add bash curl unzip
RUN curl https://rclone.org/install.sh | bash
COPY . .
CMD bash docker.sh