
# Kubernetes

## Pods

```bash
kubectl create -f pod.yml
kubectl delete -f pod.yml
kubectl delete pods hello-hh

kubectl describe pods
kubectl get pods
kubectl get pods/hello-hh
kubectl get pods --all-namespaces
```

## Replication Controller

```bash
kubectl create -f rc.yml

kubectl get rc
kubectl get rc -o wide

# Edit and apply changes
kubectl apply -f rc.yml

kubectl get pods
```

## Services

```bash
# Manually Iterative
# kubectl expose rc hello-rc --name=hello-svc --target-port=5001 --type=NodePort
# Descriptive using svc.yml
kubectl create -f svc.yml

kubectl describe svc hello-svc
kubectl get services

# Services run on vm, access via vm ipaddress or via minikube
minikube service hello-svc

# get pod endpioints with same name as service
kubectl get ep hello-svc
kubectl delete svc hello-svc
```

## Deployment

```bash
kubectl create -f deploy.yml
kubectl describe deploy hello-deploy
# Check replica sets
kubectl get rs
```

Edit deploy.yml and run

```bash
kubectl apply -f deploy.yml --record
# Status
kubectl rollout status deployment hello-deploy
kubectl get deploy hello-deploy
# check deployment history
kubectl rollout history deployment hello-deploy
kubectl get rs
```

## Undo

```bash
kubectl rollout undo deployment hello-deploy --to-revision=1
```