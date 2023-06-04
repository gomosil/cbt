docker build -t g-docker-reg.isu.mosl/g-frontend:latest ../frontend/
docker build -t g-docker-reg.isu.mosl/g-backend:latest ../backend/

docker push g-docker-reg.isu.mosl/g-frontend
docker push g-docker-reg.isu.mosl/g-backend
