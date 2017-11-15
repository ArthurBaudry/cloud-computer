#!/usr/bin/env bash

serverless deploy --aws-profile cloud-computer

terraform apply

#aws s3 sync --profile cloud-computer src/vue s3://cloud-computer-front/www