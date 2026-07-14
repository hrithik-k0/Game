pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "hk00d/rps-game"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Clone Code') {
    steps {
        cleanWs()

        git branch: 'main',
            url: 'https://github.com/hrithik-k0/Game.git'
    }
}

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:$IMAGE_TAG .'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $DOCKER_IMAGE:$IMAGE_TAG'
            }
        }

        stage('Deploy to K3s') {
            steps {
                sh '''
                export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

                sed -i "s|image:.*|image: hk00d/rps-game:$IMAGE_TAG|" Deployment.yaml

                kubectl apply -f Deployment.yaml
                kubectl apply -f service.yaml
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
                kubectl get pods
                kubectl get svc
                '''
            }
        }
    }
}