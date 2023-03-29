pipeline {
    
    agent any
    tools {nodejs "Node"}
    parameters {
        booleanParam(name: 'runTest', defaultValue: true, description: 'Toggle this value')
        choice(name: 'BROWSER', choices: ['chrome','chromnium','firefox', 'safari'], description: 'select browser to run')
    }

    post {
        always {  
            cucumber '**/report.json'

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
                sh 'BROWSER=${BROWSER}  npx cucumber-js'
            }
        }

    }
}