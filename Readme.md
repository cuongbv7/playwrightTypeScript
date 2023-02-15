docker build -f ./Dockerfile -t playwrighttest .
docker run --network host --rm -v $(pwd):/home/app/ --entrypoint npm playwrighttest run test