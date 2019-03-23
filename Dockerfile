# sample build command: sudo docker build -t ishiki-status .
# Then run with:
# docker run -it --rm -p 80:80 ishiki-status

# get base image (based itself on a resin image). Has QEMU built in
FROM lushdigital/lushroom-base:latest

RUN [ "cross-build-start" ] 

# make dirs

RUN mkdir /opt/code
RUN mkdir -p /media/usb

# copy lrpi_player repo

RUN sudo apt-get install libatlas-base-dev psmisc

COPY flask /opt/code/

RUN pip3 install -r /opt/code/flask/requirements.txt

# serve Flask from 80
WORKDIR /opt/code/flask

ENTRYPOINT ["python3"]
CMD ["Serve.py"]

EXPOSE 80

RUN [ "cross-build-end" ]