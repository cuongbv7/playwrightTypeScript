pipeline {
    agent any
    stages {

        stage("build"){
            steps {
                echo 'checking source code'
            }
        }
        stage("test") {
        
            steps{
                step {
                    echo 'checkout source code'
                }
                step {
                    echo 'running test'
                }
            }
        }
    }

}