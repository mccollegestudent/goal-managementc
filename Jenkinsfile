pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'goal-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
        DB_URL = "${DB_HOST}:${DB_PORT}/${DB_NAME}"
        DB_USER = credentials('DATABASE_USER')
        DB_PASSWORD = credentials('DATABASE_PASSWORD')
        JWT_SECRET = credentials('JWT_SECRET')
        MAIL_SENDING_EMAIL = credentials('MAIL_SENDING_EMAIL')
        MAIL_APP_PASSWORD = credentials('MAIL_APP_PASSWORD')

    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout the code from Git
                    checkout scm
                }
            }
        }

        stage('Build') {
            steps {
                    sh 'mvn clean package'    
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    dir('GM_back-end') {
                        sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    dir("${PROJECT_SUBFOLDER}") {
                        sh 'mvn test'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {

                    sh "docker stop ${DOCKER_IMAGE} || true"
                    sh "docker rm ${DOCKER_IMAGE} || true"
                    

                    sh """
                    docker run -d \
                        --name ${DOCKER_IMAGE} \
                        -p 8081:8080 \
                        -e SPRING_DATASOURCE_URL=${DB_URL} \
                        -e SPRING_DATASOURCE_USERNAME=${DB_USER} \
                        -e SPRING_DATASOURCE_PASSWORD=${DB_PASSWORD} \
                        -e JWT_SECRET=${JWT_SECRET} \
                        -e MAIL_APP_PASSWORD=${MAIL_APP_PASSWORD} \
                        -e MAIL_SENDING_EMAIL=${MAIL_SENDING_EMAIL} \
                        --restart unless-stopped \
                        ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}