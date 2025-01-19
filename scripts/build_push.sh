#!/bin/bash
docker buildx build --platform linux/amd64,linux/arm64 -t edk24/node-ocr-service:0.0.1 --push .