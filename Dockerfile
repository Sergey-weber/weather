FROM node:9-slim
WORKDIR /index
COPY package.json /index 
RUN npm install 
COPY . /index
CMD ["npm", "start"]

# docker build -t node-docker-tutorial .
# docker run -it -p 9000:3000 node-docker-tutorial