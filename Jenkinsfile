pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Jest Tests') {
            steps {
                bat 'npm test -- --runInBand'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t autoheal:1.0 .'
            }
        }

        stage('Deploy Docker Container') {
            steps {
                bat '''
                    docker stop autoheal-app || exit 0
                    docker rm autoheal-app || exit 0
                    docker run -d -p 5000:5000 --name autoheal-app autoheal:1.0
                '''
            }
        }
    }

    post {
        success {
            echo 'AutoHeal CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'AutoHeal Pipeline failed!'
        }
    }
}