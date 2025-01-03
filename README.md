# Architecture

🏗️ Infrastructure Stack Deployment - Project README

Comprehensive guide to deploying a robust CI/CD, Kubernetes, and monitoring ecosystem using Terraform, Helm, Jenkins, ArgoCD, Kafka, Flyway, and more.

📌 Overview

This project automates the deployment of a production-grade infrastructure stack using Infrastructure as Code (IaC). It includes Jenkins CI/CD pipelines, EKS (Elastic Kubernetes Service) via Terraform, monitoring and logging via Prometheus, Grafana, EFK, and seamless database migrations via Flyway.

🗺️ Architecture Diagram

Diagrams are generated using Diagrams as Code with Python and Poetry:

architecture diagram image
<a href="https://ibb.co/qMbvKTps">
  <img src="https://i.ibb.co/nshF9xjc/kubernetes-architecture.png" alt="kubernetes-architecture" border="0" />
</a>


🚀 Infrastructure Components

🔧 Terraform IaC

Used to provision Jenkins, EKS cluster, backend S3 storage, and networking components.

Backend stores .tfstate in S3 and uses DynamoDB for locking.

Terraform commands:

terraform init
terraform validate
terraform plan -var-file="prod.tfvars"
terraform apply --auto-approve -var-file="prod.tfvars"

📦 Helm & Terraform Helm Provider

Used to install charts like Kafka, PostgreSQL, Istio, kube-prometheus-stack.

Helm installed via Terraform with config_path = "~/.kube/config".



🐳 Kubernetes Stack

✅ AWS EKS

Managed Kubernetes deployed using Terraform.

Access cluster:
WS_PROFILE=<your-profile>
export REGION=us-east-1
export CLUSTER_NAME=<your-cluster-name>
aws eks update-kubeconfig --region $REGION --name $CLUSTER_NAME

🔄 ArgoCD

GitOps deployment using ArgoCD.
tent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl port-forward svc/argocd-server 8080:443 -n argocd


📥 Database Migrations - Flyway + PostgreSQL

Uses Flyway to run .sql migration scripts.

Flyway configured with secrets via Kubernetes.

Migrations run inside initContainer:

flyway migrate

Supports containerized Flyway migrations.


🛠️ Jenkins CI/CD Setup

AMI built with Jenkins pre-installed via Packer.

Jenkins setup automated using Configuration-as-Code (JCasC).

Plugins installed using Jenkins plugin manager.

Reverse proxy configured via Caddy.

Supports multi-branch pipelines using Groovy DSL.


🔁 Kafka Stack

Kafka cluster deployed using Bitnami's Helm chart.

Kafka consumer app subscribes to topic and processes messages.

Kafka setup includes 3 broker replicas and Zookeeper.



🔍 Monitoring & Logging

📊 Prometheus + Grafana

Installed via kube-prometheus-stack Helm chart.

Dashboards for CPU, memory, and pod usage.

📈 Logging - EFK Stack

ElasticSearch, Fluentbit, and Kibana setup via Helm.

Secrets for ElasticSearch and Kibana fetched via Kubernetes secrets.

Dashboards accessible at respective LoadBalancer IPs.



🤖 Kubernetes Operator (Kubebuilder)

Custom CRD and Reconciler logic built using Kubebuilder.

Cron resource triggers ConfigMap and Secret updates.

Key commands:
make install
make deploy IMG=<image>
kubectl apply -k config/samples/



📦 Local Dev Environment Setup

Python + DaC

Python environment setup using Poetry.
brew install poetry
poetry init
poetry add diagrams

PostgreSQL + Flyway
brew install postgresql@15
brew install flyway

Jenkins + Java +Python+ NodeJS + Docker

Java: sudo apt install openjdk-11-jdk

Node: curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key

Docker: sudo apt-get install docker-ce



