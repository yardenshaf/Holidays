FROM node:22-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

# Remove any existing dist folder
RUN rm -rf ./dist

# Build typescript into javascript
RUN npm run build

# Copy images folder to dist (for seeding)
RUN cp -r ./images ./dist/images || echo "No images folder found"

# lets get rid of the src folder
RUN rm -rf ./src

CMD ["npm", "start"]