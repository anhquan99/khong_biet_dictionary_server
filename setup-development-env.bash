pip3 install awscli

pip3 install awscli-local

docker-compose up

awslocal s3api create-bucket --bucket sample-bucket

# clear all objects in bucket 
#awslocal s3 rm s3://sample-bucket --recursive 