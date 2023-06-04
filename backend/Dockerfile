FROM ubuntu

RUN apt-get update
RUN apt-get install -y python3 python3-pip
RUN python3 -m pip install flask
RUN python3 -m pip install flask_cors
RUN python3 -m pip install qrcode
RUN python3 -m pip install pymongo

EXPOSE 5001
RUN mkdir app
COPY ./backend.py ./app
COPY ./db ./app/db
WORKDIR ./app
CMD python3 backend.py

