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

        stage('Test') {
            steps {
                bat 'npm test -- --runInBand'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t autoheal:latest .'
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                    docker stop autoheal-app 2>nul || exit /b 0
                    docker rm autoheal-app 2>nul || exit /b 0
                    docker run -d -p 5000:5000 --name autoheal-app autoheal:latest
                '''
            }
        }

        stage('Health Check') {
            steps {
                bat '''
                    powershell -NoProfile -Command "Start-Sleep -Seconds 5"
                    curl.exe --fail http://localhost:5000/health
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