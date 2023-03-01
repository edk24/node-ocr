FROM alpine:3.14


ENV TESSDATA_PREFIX=/usr/local/share/tessdata
ENV TIME_ZONE=Asia/Shanghai
ENV BUILD_DEPS='autoconf gcc g++ make bash'

# Timezone
RUN ln -snf /usr/share/zoneinfo/$TIME_ZONE /etc/localtime && echo $TIME_ZONE > /etc/timezone

# tencent mirrors
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.cloud.tencent.com/g' /etc/apk/repositories

# font
# RUN apk add --update ttf-dejavu fontconfig && rm -rf /var/cache/apk/* && mkfontscale && mkfontdir && fc-cache

# tesseract-ocr
RUN apk add --no-cache nodejs=14.21.3-r0 \
        npm=7.17.0-r0 \ 
        tesseract-ocr

RUN mkdir $TESSDATA_PREFIX

WORKDIR /app

COPY . /app/
COPY ./chi_sim.traineddata /usr/local/share/tessdata/chi_sim.traineddata

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]