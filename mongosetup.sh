#!/bin/bash

mongod --bind_ip_all --replSet rs &

sleep 5

echo "Starting config ..."

mongosh <<EOF
const config = {
    "_id": "rs",
    "version": 1,
    "members": [
        {
            "_id": 0,
            "host": "database:27017",
            "priority": 1
        },
    ]
};
rs.initiate(config);
EOF

echo "Config complete ..."

wait
