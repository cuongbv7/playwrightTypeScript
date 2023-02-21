pipeline {
    
    agent any
    tools {nodejs "Node"}
    parameters {
        booleanParam(name: 'runTest', defaultValue: true, description: 'Toggle this value')
        choice(name: 'BROWSER', choices: ['chrome', 'firefox', 'safari','all'], description: 'select browser to run')
    }

    post {
        always {  
              allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }

    }

    stages {
        stage('Dependencies') {
            steps {
                echo 'installing dependencies'
                sh 'npm install'
           }
       }
       stage('e2e Tests') {
            when { 
                expression { params.runTest==true}
             }
            steps {
                echo "running test on ${params.BROWSER}"
                sh 'npx playwright test --project=${BROWSER} --reporter=line,allure-playwright'
           }
       }
       
    }
}