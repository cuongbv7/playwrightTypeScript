pipeline {
    
    agent any
    tools {nodejs "Node"}

    post {
        always {  
            publishHTML target: [
                reportName: 'Playwright',
                reportDir: 'playwright-report',
                reportFiles: 'index.html', 
                reportTitles: 'Playwright demo', 
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: false
            ]  
        }
    }

    stages {
        stage('Dependencies') {
            steps {
                echo 'installing dependencies'
                sh 'npm i'
                sh 'npm install'
           }
       }
       stage('e2e Tests') {
           steps {
                echo 'running test'
                sh 'npm run test'
           }
       }
       
    }
}