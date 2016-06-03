#!/usr/bin/env bash

forever start -l /nodeApp/forever.log -o out.log -e err.log /nodeApp/renameImage.js
exec /opt/nginx/sbin/nginx "$@"
exec "$@"