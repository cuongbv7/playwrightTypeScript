pipeline {
    
    agent any
    tools {nodejs "node"}

    post {
        always {
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false,
             keepAll: false, reportDir: 'playwright-report', 
             reportFiles: 'index.html', reportName: 'HTML Report', 
             reportTitles: '', 
             useWrapperFileDirectly: true]) 
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