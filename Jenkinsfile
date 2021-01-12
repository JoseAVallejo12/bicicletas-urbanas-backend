pipeline{

		agent {
		label 'Slave_Induccion'
		}


		triggers {
        pollSCM('@hourly')
		}

		options {
			buildDiscarder(logRotator(numToKeepStr: '5'))
			disableConcurrentBuilds()
		}

		stages{

			stage('Checkout') {
				steps {
                echo '------------>Checkout desde Git Microservicio<------------'
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], gitTool: 'Default' , submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'GitHub_JoseAVallejo12', url: 'https://github.com/JoseAVallejo12/bicicletas-urbanas-backend']]])
				}
			}


			stage('compilar '){
                steps {
                    sh 'npm i'
                    sh 'npm run build'
				}
            }
            stage('test '){
                steps {
                    sh 'npm run test:cov'
				}
            }


			 stage('Sonar Analysis'){
			 	steps{
			 		echo '------------>Analisis de código estático<------------'
			 		  withSonarQubeEnv('Sonar') {
                         sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dsonar.projectKey=co.com.Ceiba:BicicletasUrbanas.jose.vallejo.master -Dsonar.projectName=Ceiba-BicicletasUrbanas(jose.vallejo) -Dproject.settings=./sonar-project.properties"
                      }
			 	}
			 }



		}
		post {
			failure {
				mail(to: 'jose.vallejo@ceiba.com.co',
				body:"Build failed in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}/n/nPlease go to ${env.BUILD_URL} and verify the build",
				subject: "ERROR CI: ${env.JOB_NAME}")
			}
		}

}