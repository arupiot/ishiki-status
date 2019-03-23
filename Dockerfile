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

# removed the brick daemon from here to go into its own container
#RUN sudo apt-get install libusb-1.0-0 libudev0 pm-utils
#RUN wget http://download.tinkerforge.com/tools/brickd/linux/brickd_linux_latest_armhf.deb
#RUN sudo dpkg -i brickd_linux_latest_armhf.deb

RUN git clone --single-branch -b master --depth 3 https://github.com/arupiot/ishiki-status /opt/code && \
    pip3 install -r /opt/code/flask/requirements.txt

# serve Flask from 80
WORKDIR /opt/code/flask

ENTRYPOINT ["python3"]
CMD ["Serve.py"]

EXPOSE 80

RUN [ "cross-build-end" ]