#!/bin/sh

set -eu

/usr/bin/docker exec hijunaid-site nginx -t
/usr/bin/docker exec hijunaid-site nginx -s reload
