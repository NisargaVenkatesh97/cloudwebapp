pipeline {
  agent any
  tools { nodejs "node" }
  environment {
    GH_TOKEN = credentials('jenkins-pat')
    SSH_CREDENTIAL_ID = credentials('gke-bastion') // bastion sshagent
    BASTION_IP = credentials('bastion-ip') // bastion host ip address
    USERNAME = credentials('bastion-username') // bastion host username
    PRIVATE_KEY = credentials('private-key') // ssh key for bastion
    K8S_SA_JSON = credentials('k8s-sa-json') // json file for K8S SA
    ROBOCOP = credentials('robocop') // image pull secrets for quay.io
    GKE_CLUSTER_NAME = credentials('gke-cluster-name') // cluster name
    GKE_CLUSTER_REGION = credentials('gke-cluster-region') // cluster region
    GKE_PROJECT_NAME = credentials('gke-project-name') // GKE project name
  }
  stages {
    stage('Clone repository') {
      when {
        branch 'master'
      }
      steps {
        cleanWs()
        checkout scm
      }
    }
    stage('Release with semantic-release') {
      when {
        branch 'master'
      }
      steps {
        sh '''
        npm ci
        npx semantic-release
        '''
      }
    }
    stage('Build Image') {
      when {
        branch 'master'
      }
      steps {
        sh 'docker build --no-cache -t quay.io/pwncorp/webapp:$(npm pkg get version | xargs) -t quay.io/pwncorp/webapp:latest -f Dockerfile .'
      }
    }
    stage('Push Image') {
      when {
        branch 'master'
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
          sh 'docker login quay.io -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD'
          sh 'docker image push --all-tags quay.io/pwncorp/webapp'
        }
      }
    }
    stage('Helm Upgrade @ GKE') {
      when {
        branch 'master'
      }
      steps {
        sshagent(['gke-bastion']) {
          sh '''
          cat $PRIVATE_KEY > gke_compute
          cat $K8S_SA_JSON > sa.json
          scp -i gke_compute -o StrictHostKeyChecking=no sa.json $USERNAME@$BASTION_IP:/home/$USERNAME
          ssh -i gke-compute -o StrictHostKeyChecking=no $USERNAME@$BASTION_IP ./download-tarball.sh webapp-helm-chart
          ssh -i gke-compute -o StrictHostKeyChecking=no $USERNAME@$BASTION_IP gcloud auth activate-service-account --key-file=sa.json
          ssh -i gke-compute -o StrictHostKeyChecking=no $USERNAME@$BASTION_IP gcloud config configurations list
          ssh -i gke-compute -o StrictHostKeyChecking=no $USERNAME@$BASTION_IP gcloud container clusters get-credentials $GKE_CLUSTER_NAME --region $GKE_CLUSTER_REGION --project $GKE_PROJECT_NAME
          ssh -i gke-compute -o StrictHostKeyChecking=no $USERNAME@$BASTION_IP kubectl config view
          ssh -i gke-compute -o StrictHostKeyChecking=no $USERNAME@$BASTION_IP kubectl get ns
          ssh -i gke-compute -o StrictHostKeyChecking=no $USERNAME@$BASTION_IP helm ls -n webapp -a
          ssh -i gke-compute -o StrictHostKeyChecking=no $USERNAME@$BASTION_IP cp -r csye7125-fall2023* webapp-helm-chart
          ssh -i gke-compute -o StrictHostKeyChecking=no $USERNAME@$BASTION_IP helm upgrade -n webapp webapp-helm-release webapp-helm-chart --set=imagePullSecrets.dockerConfig=$ROBOCOP --set=config.k8s_docker_config_json=$ROBOCOP || echo "version already exists on the cluster"
          ssh -i gke-compute -o StrictHostKeyChecking=no $USERNAME@$BASTION_IP helm ls -n webapp -a
          ssh -i gke-compute -o StrictHostKeyChecking=no $USERNAME@$BASTION_IP rm -rf webapp-helm-chart*
          '''
        }
      }
    }
  }
  post {
    always {
      sh 'docker logout'
      sh 'docker system prune -a -f'
    }
  }
}
