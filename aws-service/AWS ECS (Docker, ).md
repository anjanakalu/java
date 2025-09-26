Source: https://www.youtube.com/watch?v=AiiFbsAlLaI (check in notion too for notes)
# AWS ECS (Elastic Container Service) - Complete Deployment Guide
AWS, Nodejs -> Docker-> ECS
```
AWS ECS (Elastic Container Service)
├── 🔧 ECS CLUSTER ("Virtual Machine Farm")
│   │   📍 Console: ECS → Clusters → production-app-cluster
│   │
│   ├── 🚀 ECS SERVICE ("Application Manager")
│   │   │   📍 Console: ECS → Clusters → Services → api-production-service
│   │   │
│   │   ├── 📋 TASK DEFINITION ("Container Recipe")
│   │   │   │   📍 Console: ECS → Task Definitions → app-api-task
│   │   │   │
│   │   │   ├── 🐳 Container 1 Settings
│   │   │   │   ├── Image: ECR_URL (from ECR repository)
│   │   │   │   ├── CPU: 1 vCPU
│   │   │   │   ├── Memory: 3GB
│   │   │   │   ├── Port Mapping: 8000→8000
│   │   │   │   └── Health Check: /health endpoint
│   │   │   │
│   │   │   └── 🐳 Container 2 Settings (if multiple containers)
│   │   │
│   │   ├── ⚡ RUNNING TASKS (2+ Containers)
│   │   │   │   📍 Console: ECS → Services → Tasks tab
│   │   │   │
│   │   │   ├── Task 1 (Container Instance)
│   │   │   ├── Task 2 (Container Instance)
│   │   │   └── ... (Auto-scaled tasks up to 10)
│   │   │
│   │   ├── ⚖️ LOAD BALANCER ("Traffic Distributor")
│   │   │   │   📍 Console: EC2 → Load Balancers → app-production-lb
│   │   │   │
│   │   │   ├── Listener: Port 80 (HTTP)
│   │   │   ├── Target Group: app-api-target-group
│   │   │   └── 🌐 DNS: app-lb-1234.region.elb.amazonaws.com
│   │   │
│   │   └── 📈 AUTO SCALING ("Resource Manager")
│   │       │   📍 Console: ECS → Services → Auto Scaling tab
│   │       │
│   │       ├── Min Tasks: 2 (always running)
│   │       ├── Max Tasks: 10 (maximum during peak)
│   │       └── Scale at: 70% CPU utilization
│   │
│   └── 🔄 OTHER SERVICES (Future microservices in same cluster)
│
├── 📦 ECR (Docker Image Storage)
│   │   📍 Console: ECR → Repositories → my-application-api
│   │
│   └── Repository: my-application-api
│       └── 🏷️ Image: account-id.dkr.ecr.region.amazonaws.com/repo:tag
│
└── 📊 MONITORING & LOGS
    │   📍 Console: CloudWatch
    │
    ├── Logs: Container application logs
    ├── Metrics: Performance monitoring
    └── Alarms: Auto scaling triggers
```
        
## Table of Contents
1. [Introduction to ECS](#1-introduction-to-ecs)
2. [Application Setup](#2-application-setup)
3. [Docker Containerization](#3-docker-containerization)
4. [AWS ECR Setup](#4-aws-ecr-setup)
5. [ECS Cluster Creation](#5-ecs-cluster-creation)
6. [Task Definition](#6-task-definition)
7. [ECS Service with Load Balancer](#7-ecs-service-with-load-balancer)
8. [Auto Scaling](#8-auto-scaling)
9. [Deployment Strategy](#9-deployment-strategy)

---

## 1. Introduction to ECS

### Architecture Flow:
```
Local Docker Image → Push to ECR → ECS Task Definition → ECS Service → Load Balancer → Users
```

### Key Components:
- **ECR (Elastic Container Registry)**: Stores Docker images (like Docker Hub)
- **ECS Cluster**: Logical grouping of services/tasks
- **Task Definition**: Blueprint for how to run Docker containers
- **ECS Service**: Manages and maintains desired number of task instances
- **Load Balancer**: Distributes traffic across multiple tasks

**AWS Console Location**: `ECS > Dashboard`

---

## 2. Application Setup

### Application Code:
```javascript
import express, { Router } from "express";

const app = express();
const PORT = process.env.PORT ?? 8000;

// Define router
const router = Router();

router.get("/", (req, res) => res.json({ message: "Hello from Docker" }));

router.get("/health", (req, res) =>
  res.status(200).json({ message: "Everything is good here 03" })
);

// Start server
app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
```

### ✅ Application Checklist:
- **Port**: 8000
- **Routes**:
  - `GET /` → `{ message: "Hello from Docker" }`
  - `GET /health` → `{ message: "Everything is good here 03" }`

### Package.json Scripts:
```json
"scripts": {
  "start": "node dist/index.js",
  "build": "tsc -p ."
}
```

**Commands**:
- `npm run build` - Compiles TypeScript to JavaScript
- `npm start` - Runs the server from `dist/index.js`

---

## 3. Docker Containerization

### Multi-stage Dockerfile:
```dockerfile
# ---------- Stage 1: Build ----------
FROM node:18 AS builder
WORKDIR /build
COPY package*.json ./
RUN npm install
COPY src/ src/
COPY tsconfig.json ./
RUN npm run build

# ---------- Stage 2: Runtime ----------
FROM node:18 AS runner
WORKDIR /app
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/node_modules/ ./node_modules/
COPY --from=builder /build/dist/ ./dist/
CMD ["npm", "start"]
```

### Docker Multi-stage Build Summary:

| Stage | Purpose | Output |
|-------|---------|---------|
| **Builder** | Compiles TypeScript, installs dependencies | ✅ `dist/`, `node_modules/` |
| **Runner** | Runs only what is needed | ✅ Clean, production-ready container |

### Local Docker Commands:
```bash
# Build image
docker build -t my-app-image .

# Run container locally
docker run -p 8000:8000 my-app-image
```

**Test locally**: `http://localhost:8000/` or `http://localhost:8000/health`

---

## 4. AWS ECR Setup

**AWS Console Location**: `ECR > Repositories`

### Step-by-Step ECR Setup:

#### 1. Create ECR Repository
- **Type**: Private
- **Repository name**: `my-application-api`

#### 2. Authenticate Docker to ECR
```bash
aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.<your-region>.amazonaws.com
```

#### 3. Build, Tag, and Push Image
```bash
# Build Docker image
docker build -t my-app-production .

# Tag image for ECR
docker tag my-app-production <aws-account-id>.dkr.ecr.<your-region>.amazonaws.com/my-application-api

# Push to ECR
docker push <aws-account-id>.dkr.ecr.<your-region>.amazonaws.com/my-application-api
```

✅ **Image URL Format**: `aws-account-id.dkr.ecr.region.amazonaws.com/repository-name`

**Important**: This newly created image URL from Step 4 will be used in the Task Definition (Step 6) to specify which container image to run.

---

## 5. ECS Cluster Creation

**AWS Console Location**: `ECS > Clusters`

### Cluster Configuration:
- **Cluster name**: `production-app-cluster`
- **Infrastructure**: AWS Fargate (serverless)
- **Networking**: Default VPC

### Why Choose AWS Fargate Over EC2?
- **Serverless**: No need to manage EC2 instances
- **Cost-Effective**: Pay only for resources used (relative cheaper for variable workloads)
- **Automatic Scaling**: No capacity planning required
- **Simpler Management**: AWS handles infrastructure management

**Note**: One cluster can contain multiple services (auth service, API service, socket service, etc.)

**Cluster Location**: You can find your cluster in `EC2 > ECS > Clusters`

---

## 6. Task Definition

**AWS Console Location**: `ECS > Task Definitions`

### Task Definition Details:
- **Task name**: `app-api-task`
- **Launch type**: AWS Fargate
- **OS**: Linux ARM64
- **CPU**: 1 vCPU
- **Memory**: 3GB

### Container Configuration:
- **Image URL**: Paste the ECR image URL created in Step 4
- **Container name**: `app-api-container`
- **Port mapping**: Container port 8000 → Host port 8000

### What is Port Mapping?
Port mapping connects the container's internal port (8000) to the host's port (8000). In this case, it allows external traffic to reach your application running inside the container on port 8000.

### Health Check Configuration:
```bash
CMD-SHELL curl -f http://localhost:8000/health || exit 1
```
- **Interval**: 30 seconds
- **Purpose**: Checks container health every 30 seconds
- **Exit 1 Meaning**: If the health check fails (curl command returns error), the container will exit with status code 1, indicating it's unhealthy

**Task Definition Location**: You can find Task Definitions in `EC2 > ECS > Task Definitions`

---

## 7. ECS Service with Load Balancer

**AWS Console Location**: `ECS > Clusters > Your-Cluster > Services`

### Service Configuration:
- **Service name**: `api-production-service`
- **Task definition family**: `app-api-task`
- **Desired tasks**: 2 (means 2 containers will be running simultaneously for high availability)
- **Deployment type**: Rolling update (gradually replaces old containers with new ones)

### Load Balancer Setup:
**AWS Console Location**: `EC2 > Load Balancers`

- **Load balancer name**: `app-production-lb`
- **Type**: Application Load Balancer
- **Listener Port 80**: Listens for HTTP traffic on port 80
- **Target group**: `app-api-target-group`
- **Health check path**: `/health`

### What is "Rolling Update"?
Rolling update means deploying new containers gradually while keeping old containers running until new ones are healthy, ensuring zero downtime.

### How to Access Your Application:
- **Load Balancer DNS**: `app-production-lb-123456.aws-region.elb.amazonaws.com`
- **To find DNS**: Go to `EC2 > Load Balancers > Select your load balancer > Copy DNS name`

Routes traffic to healthy containers automatically.

**Task and Service Relationship**: Tasks are individual running containers, while Services manage and maintain the desired number of tasks.

---

## 8. Auto Scaling

**AWS Console Location**: `ECS > Clusters > Your-Cluster > Services > Your-Service > Auto Scaling`

### Scaling Configuration:
- **Minimum tasks**: 2 (always keep at least 2 containers running)
- **Maximum tasks**: 10 (can scale up to 10 containers during high traffic)
- **Policy name**: `app-scaling-policy`
- **Metric**: ECS service metric
- **Target value**: 70% CPU utilization (scale when CPU usage reaches 70%)

**Purpose**: Automatically scales tasks from 2 to 10 based on traffic load

### What Do Minimum and Maximum Tasks Mean?
- **Minimum tasks**: Always running containers (ensures availability)
- **Maximum tasks**: Upper limit to prevent excessive resource usage

---

## 9. Deployment Strategy

### Blue/Green Deployment:
- **Deployment type**: Rolling update
- **Benefit**: Zero-downtime deployments

### Deployment Process:
1. Push new image version to ECR
2. Update task definition with new image
3. Service automatically deploys new tasks
4. Health checks validate new containers
5. Traffic gradually shifts to new containers
6. Old containers are terminated after successful deployment

### When New Version is Released - What Happens?
When you deploy a new version:
- New containers (new version) are created alongside old containers (current version)
- Health checks verify new containers are healthy
- Traffic gradually shifts from old to new containers
- Once all traffic is on new version, old containers are terminated
- **Result**: Zero downtime during deployment

### Force New Deployment:
- **AWS Console**: `ECS > Services > Your-Service > Update > Force new deployment`
- **Behavior**: Creates new containers while keeping old ones running until new ones are healthy
- **Use Case**: When you need to redeploy without changing the task definition

### Health Monitoring:
- **How to check healthy containers**: Go to `EC2 > ECS > Clusters > Your-Cluster > Services > Your-Service`
- **Healthy tasks**: Indicates running containers
- **Unhealthy tasks**: Automatically replaced by ECS

---

## ✅ Summary Checklist:

1. ✅ Application code with health endpoint
2. ✅ Docker containerization with multi-stage build
3. ✅ ECR repository created and image pushed
4. ✅ ECS cluster created
5. ✅ Task definition configured with health checks
6. ✅ ECS service created with load balancer
7. ✅ Auto scaling configured
8. ✅ Deployment strategy implemented

This setup provides a fully managed, scalable container orchestration system on AWS with zero-downtime deployments and automatic health monitoring.
