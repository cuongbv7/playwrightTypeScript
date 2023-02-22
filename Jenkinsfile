pipeline {
    
    agent any
    tools {nodejs "Node"}
    parameters {
        booleanParam(name: 'runTest', defaultValue: true, description: 'Toggle this value')
        choice(name: 'BROWSER', choices: ['chrome', 'firefox', 'safari','all'], description: 'select browser to run')
        string(name: 'WORKERS',  defaultValue: '2', description: 'Number or process workers to run')

    }

 /*   post {
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
    */
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
                sh 'npx playwright test --workers=${WORKERS} --project=${BROWSER} --reporter=line,allure-playwright'
           }
       }
       
    }
}