FROM mhart/alpine-node:13.12.0

WORKDIR /src

COPY . /src

RUN npm i

CMD ["npm", "run", "build"]
