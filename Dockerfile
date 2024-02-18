FROM mongo:latest

COPY ./mongosetup.sh ./usr/local/bin/mongosetup.sh

RUN chmod +x ./usr/local/bin/mongosetup.sh

CMD [ "mongosetup.sh" ]
