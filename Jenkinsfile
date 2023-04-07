pipeline {
    
    agent any
    tools {nodejs "Node"}
    parameters {
      //  booleanParam(name: 'runTest', defaultValue: true, description: 'Toggle this value')
        choice (name: 'runOn', choices: ['local', 'browserStack'],description: 'select envinroment to run')
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
                sh 'npm install'
            }
        }
        stage('e2e Tests on local') {
            when { 
                expression { params.runOn=='local'}
            }
            steps {
                echo "running test on ${params.BROWSER}"
                sh 'npx playwright test --workers=${WORKERS} --project=${BROWSER} --reporter=line,allure-playwright'
            }
        }

        stage('e2e Tests on browser stack') {
            when { 
                expression { params.runOn=='browserStack'}
            }
            steps {
            browserstack(credentialsId: 'c2ac8705-48ce-474a-b784-9458cf229934') {
                 // add commands to run test
                 // Following are some of the example commands -----
                echo 'running on browser stack'
                sh 'npx playwright test --config=./playwright-browserstack.config.ts --reporter=line,allure-playwright'
            }
              // Enable reporting in Jenkins
            browserStackReportPublisher 'automate'
            }
        }
    }
}