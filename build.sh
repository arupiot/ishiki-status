sudo docker build -t ishiki-status .
sudo docker images
sudo docker tag ishiki-status arupiot/ishiki-status:staging
sudo docker push arupiot/ishiki-status:staging