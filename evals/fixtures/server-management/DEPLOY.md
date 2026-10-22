# Deploy notes

- Host: 4 vCPU, 8 GB RAM, Ubuntu 24.04, PM2 installed globally.
- The service leaks memory slowly; restart any worker above 400 MB.
- Production needs NODE_ENV=production and PORT=8080.
