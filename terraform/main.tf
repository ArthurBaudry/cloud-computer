provider "aws" {
  region = "ap-southeast-2"
  profile = "cloud-computer"
}

resource "aws_s3_bucket" "webapp_bucket" {
  bucket = "cloud-computer-front"
  acl = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

resource "aws_s3_bucket_object" "webapp_index" {
  key = "index.html"
  bucket = "${aws_s3_bucket.webapp_bucket.bucket}"
  source = "src/main/vue/index.html"
  server_side_encryption = "AES256"
}

resource "aws_s3_bucket_policy" "webapp_bucket_policy" {
  bucket = "${aws_s3_bucket.webapp_bucket.id}"
  policy = <<POLICY
{
  "Version":"2012-10-17",
  "Statement":[
  {
    "Sid":"PublicReadForGetBucketObjects",
     "Effect":"Allow",
      "Principal": "*",
     "Action":["s3:GetObject"],
     "Resource":["arn:aws:s3:::${aws_s3_bucket.webapp_bucket.bucket}/*"]
  },
  "Sid": "DenyIncorrectEncryptionHeader",
  "Effect": "Deny",
  "Principal": "*",
  "Action": "s3:PutObject",
  "Resource": "arn:aws:s3:::${aws_s3_bucket.webapp_bucket.bucket}/*",
  "Condition": {
    "StringNotEquals": {
           "s3:x-amz-server-side-encryption": "AES256"
     }
  },
  "Sid": "DenyUnEncryptedObjectUploads",
  "Effect": "Deny",
  "Principal": "*",
  "Action": "s3:PutObject",
  "Resource": "arn:aws:s3:::${aws_s3_bucket.webapp_bucket.bucket}/*",
  "Condition": {
          "Null": {
                 "s3:x-amz-server-side-encryption": true
          }
 }
 ]
}
POLICY
}

