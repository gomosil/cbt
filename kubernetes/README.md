# Kubernetes Deployment
Since it is redundant for this project to take up space in Docker Hub, this project utilizes self hosted Docker registry. Therefore, if you would like to build yourself this project as a container, please do so.

## Building Containers
You can simply build containers by
```
./build_and_push.sh
```
Modify some parts of this shell script since this utilizes private Docker registry which is `g-docker-reg.isu.mosl` which is not a valid TLD. This is also self hosted domain using Bind9.

## Share Credentials of Private Registry
Since the private registry has its own credentials, share the credentials into Kubernetes using generate_creds.sh. 
```
./generate_creds.sh
```
This will generate a `imagePullSecret` named `regcred`. Therefore use this accordingly.

## Deploy Kubernetes Resources
Simply apply the provided `deploy.yaml`. This will fire up everything required.
```
kubectl apply -f deployment.yaml
```
This will generate:
- MongoDB: This will include `Deployment`, `Service`, `PersistentVolume`, `PersistentVolumeClaim`
- Frontend: This will include `Deployment`, `Service`
- Backend: This will include `Deployment`, `Service`

In order to store MongoDB's data persistently regardless of the pods' regeneration, this spec file uses Persistent Volume which utilizes NFS server. The `deployment.yaml` utilizes the master node's NFS server. If you are not willing to use a NFS server as a backend storage, just use deployment. But be aware that this will be stateless.

> In some environments, the maximum length that an `apply` can handle might fall short than the provided `deploy.yaml`. Therefore, if this does not work, try with `create`

Also due to webpack's issues in ReactJS, the deployment generates `.env` file and keeps the tty alive. For more information, check following links:
- https://github.com/facebook/create-react-app/issues/8688
- https://stackoverflow.com/questions/37559704/
