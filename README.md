# 🚀 Rock Paper Scissors — CI/CD with GitHub Actions + Minikube

## Project Structure
```
rps-game/
├── .github/
│   └── workflows/
│       └── ci-cd.yml        # GitHub Actions pipeline
├── k8s/
│   ├── deployment.yaml      # Kubernetes Deployment
│   └── service.yaml         # Kubernetes Service (NodePort)
├── assets/                  # Game images (rock/paper/scissors)
├── index.html
├── app.js
├── style.css
├── Dockerfile
└── nginx.conf
```

---

## ⚙️ One-Time Setup

### 1. Docker Hub
- Create an account at https://hub.docker.com
- Create a repository named `rps-game`
- Generate an access token: Account Settings → Security → New Access Token

### 2. GitHub Secrets
Go to your repo → **Settings → Secrets and variables → Actions** and add:

| Secret Name          | Value                        |
|----------------------|------------------------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username     |
| `DOCKERHUB_TOKEN`    | Your Docker Hub access token |

### 3. Update deployment.yaml
Replace `YOUR_DOCKERHUB_USERNAME` in `k8s/deployment.yaml`:
```yaml
image: your-username/rps-game:latest
```

### 4. Self-Hosted GitHub Actions Runner
Since Minikube runs locally, the deploy job needs a **self-hosted runner** on your machine:

```bash
# On your local machine where Minikube runs:
# Go to: GitHub repo → Settings → Actions → Runners → New self-hosted runner
# Follow the instructions to install and start the runner
```

### 5. Start Minikube
```bash
minikube start
```

---

## 🔄 Pipeline Flow

```
Push to main
     │
     ▼
┌─────────────┐
│   BUILD     │  Builds Docker image
│             │  Pushes to Docker Hub
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   DEPLOY    │  Applies k8s manifests
│             │  Waits for rollout
│             │  Prints access URL
└─────────────┘
```

---

## 🌐 Access the App

After deployment, run:
```bash
minikube service rps-game-service --url
```
This gives you a URL like `http://192.168.49.2:30080` — open it in your browser.

---

## 🛠️ Useful Commands

```bash
# Check pods
kubectl get pods -l app=rps-game

# Check service
kubectl get svc rps-game-service

# View logs
kubectl logs -l app=rps-game

# Rollback if something goes wrong
kubectl rollout undo deployment/rps-game

# Delete everything
kubectl delete -f k8s/
```