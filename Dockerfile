FROM mcr.microsoft.com/playwright:v1.30.0-focal
WORKDIR /home/app/
ENTRYPOINT ["npm","run","test"]