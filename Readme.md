to run with docker
docker build -f ./Dockerfile -t playwrighttest .
docker run --network host --rm -v $(pwd):/home/app/ --entrypoint npm playwrighttest run test

to run on BrowserStack:

npm install

npm run test:browser-stack
