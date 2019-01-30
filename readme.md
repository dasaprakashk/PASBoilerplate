<h1>PASBoilerplate - Microservices Reference implementation</h1>

This implementation is done in a hackathon in 16 hours by 3 people. Five lifecycle apis for registration, submission, quote, rate and issue are created as microservices. An angular app is created as a frontend.

Clone the repo.

> $ git clone https://github.com/Tachion2018/PASBoilerplate.git

**Microservices are available in the following folders:**

1. Issue
2. Quote
3. Registration
4. Submission

**UI is available in UI/PASUI - Angular 6**

For downloading all node packages use the following command:

> npm i

To get the UI up and running:

> ng build
> ng serve

**Azure Cosmos DB is used for backend and the DB logic is abstracted in DocumentDBRepository in the microservices.**

To get the microservices up and running:

> dotnet add package Microsoft.Azure.DocumentDB --version 2.2.0

> dotnet build

> dotnet run

<h3>Create docker images</h3>

Dockerfile and .dockerignore files are added in each service. Install docker in your development machine to create images, add to registry and to push the images to the host.

To create docker image:

> docker build -t "your_servicename" .

For example, for registration use:

> docker build -t registration .

To run docker image:

> docker run --name someapi --rm -it -p 8000:80 registration
    
You might face CORS issues. The code in Startup.cs will enable CORS. Remember to add the following package:

> dotnet add package Microsoft.AspNetCore.Cors --version 2.2.0

<h3>Create and push images to Azure Container Registry</h3>

**Create an ACR in Azure. We used the private registry provided by Azure. You can also choose to push the images to public registries like DockerHub.**

Login to Azure ACR:

> docker login --username /username/ --password /password/ /registryname/.azurecr.io
    
Tag image:

> docker tag /servicename/ /registryname/.azurecr.io/foldername/servicename:v1

For example:

> docker tag registration tachion2018registry.azurecr.io/docker-images/registration:v1

Push image:

> docker push registryname.azurecr.io/foldername/servicename:v1
    
**From hereon, execute commands in Azure CLI**
    
Check images in ACR:

> az acr repository list --name /registryname/ --output table
    
<h3>Create Azure Kubernetes Cluster</h3>

Create service principal:

> az ad sp create-for-rbac --skip-assignment

This will return:

```json
{
    "appId": "guid",
    "displayName": "name",
    "name": "name",
    "password": "guid",
    "tenant": "guid"
}
```

**It is important to keep a note of this service principal and pass word which will used as client secret when we create AKS cluster.**

Create AKS:

> az aks create \
    --resource-group <resource_group_name> \
    --name <cluster_name> \
    --node-count <node_count> \
    --service-principal <appId_from_prev_step> \
    --client-secret <password_from_prev_step> \
    --generate-ssh-keys
    
Merge credentials of AKS cluster to the console:

> az aks get-credentials --resource-group /resource_group_name/ --name /cluster_name/

Check the nodes assigned:

> kubectl get nodes

**The YAML file will pull the images from ACR and deploy to AKS. We need to authorize AKS to connect to ACR to pull the images and perform deployment.**

Let's create a secret for AKS to connect to ACR. To get the credentials, got to access key in ACR and get the username and password.

> kubectl create secret docker-registry acr-auth --docker-server "registryname.azurecr.io" --docker-username "username" --docker-password "password" --docker-email "email"
    
Deploy the images to create a containerized service:

> kubectl create -f registration-kubectl.yaml

** Use corresponding yaml to create other services**

Check the pods:

> kubectl get pods

** YAML file will contain sections for deployment, service and Load-balancing.**
LB gives the external ip. It takes few seconds to generate external ip. Watch for the ip using the following command.

> kubectl get service registrationlb --watch

**Use nginx ingress to load balance the services**

https://docs.microsoft.com/en-us/azure/aks/kubernetes-helm