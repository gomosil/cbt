kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=/home/isu/.docker/config.json \
    --type=kubernetes.io/dockerconfigjson
