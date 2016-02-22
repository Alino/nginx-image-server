#!/usr/bin/env bash

exec /opt/nginx/sbin/nginx "$@"
exec "$@"