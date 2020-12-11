# project

## Project setup

#### For each folder install node_modules

```
cd testproject-front
npm install
cd ../testproject-backend
npm install
```
#### Run back and front side, before check if mango installed and has an up-to-date version, install if need

```
mongo --version

cd ../testproject-backend
node serve.js

cd testproject-front
npm run serve

http://localhost:8081

```

## Project setup 'experimental way' advanced  

#### Install node_modules 
Run command from root directory project  
```
npm run packages:npm
```
#### Run back and front side
Run command from root directory project  
```
npm run start
```
