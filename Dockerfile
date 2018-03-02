# base image
FROM node:8.9.4

# working directory related
RUN mkdir /code
WORKDIR /code

# adding node_modules to path
ENV PATH /code/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /code/package.json
RUN npm install

# start app
CMD ["npm","start"]