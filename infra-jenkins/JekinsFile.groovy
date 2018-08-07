node {
    try {
        stage ('clone') {
            git branch: 'develop', url: 'https://github.com/dipeshy/hh-reminder.git'
        }
        
        dir('infra-docker/tests') {
            sh "BUILD_NO=${env.BUILD_NUMBER} ./start.sh"
        }
        notify('Success')
    } catch (err) {
        echo "Caught: ${err}"
        notify("Error ${err}")
        currentBuild.result = 'FAILURE'
    }
    
    stage ('archiving') {
        step([$class: 'JUnitResultArchiver', testResults: 'infra-docker/reports/*.xml'])
    }
}

def notify(status){
    emailext (
      to: "maxdipesh@gmail.com",
      subject: "${status}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>${status}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at <a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a></p>""",
    )
}