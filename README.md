# A demo of deploying a Nodejs Application in Kubernetes
This repo includes app.js file which provide 3 api and response html output format

Dockerfile is included to build Docker Image, this will be used to deploy the app to k8s

## The idea
### App.js
The main app (app.js) provide 3 api and get some environment variables:

MY_NODE_NAME

MY_POD_NAMESPACE

MY_POD_NAME

MY_POD_IP

These variables will be set during deployment in k8s.

I use these variables and update to relevant parameter in index.html before response to client (by using string replace)

### Deployment step
- Build your nodejs app
- Build docker images (using Dockerfile included in this repo)
- Push the image to your registry 
- Deploy the app to k8s using yaml manifest files (deployment.yaml, service.yaml and ingress.yaml) 

## Detail guide
### Step1: Install docker, nodejs, npm on your machine where you store and build your app

### Step2: Build the app
sudo npm install

### Step3: Build docker image and push to registry 
docker build -t harbor.prod.viettq.com/demo/my-app:v1 .

docker push harbor.prod.viettq.com/demo/my-app:v1

(Change to registry information to your registry)

### Step4: Deploy to k8s
kubectl -n demo apply -f kubernetes/deployment.yaml

kubectl -n demo apply -f kubernetes/service.yaml

kubectl -n demo apply -f kubernetes/ingress.yaml

(Change ingress host config to your domain if needed)

### Step5: Verify
Connect to your app from web browser with your workernode_ip:31123/
![image](https://user-images.githubusercontent.com/63487262/184474127-4c2eb53f-fdf8-4d18-87cc-0ef061bcb625.png)

or 

curl WorkerNode_IP:31123/

or using web browser to connect to hostname configured in ingress (kubernetes/ingress.yaml)

![image](https://user-images.githubusercontent.com/63487262/184474146-4d03dac2-1186-4452-9423-884bf9ef27ab.png)

