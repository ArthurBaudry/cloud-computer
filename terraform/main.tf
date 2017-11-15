provider "aws" {
  region = "ap-southeast-2"
  profile = "cloud-computer"
}

resource "aws_s3_bucket" "b" {
  bucket = "cloud-computer-front"
  acl = "public-read"
  policy = "${file("policy.json")}"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}