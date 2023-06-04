# Portforward 27017 from mongodb service for dev usage.
kubectl port-forward svc/mongodb-service --address 0.0.0.0 27017:27017 &
