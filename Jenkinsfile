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
            sh 'npm install'
        }
    }

    stage('Test') {
        steps {
            sh 'npm test -- --runInBand'
        }
    }

    stage('Docker Build') {
        steps {
            sh 'docker build -t autoheal:latest .'
        }
    }

    stage('Deploy') {
        steps {
            sh '''
                docker stop autoheal-app || true
                docker rm autoheal-app || true
                docker run -d -p 5000:5000 --name autoheal-app autoheal:latest
            '''
        }
    }

    stage('Health Check') {
        steps {
            sh '''
                sleep 5
                curl -f http://localhost:5000/health
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
// Jenkins webhook test