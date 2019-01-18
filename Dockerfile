FROM  is.jd.com/o2athena/o2-centos7.2-nodejs10.14

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --registry=http://registry.m.jd.com --production

COPY . .

ENTRYPOINT /usr/sbin/sshd && \
chmod +x /app/start.sh && \
/app/start.sh && sleep 9999d
