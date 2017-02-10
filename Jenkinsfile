node {

	stage 'Stop Server'
	sh 'killall node || true'
	
	stage 'Checkout'
	checkout scm

	try {

		stage 'Build'
		sh 'npm install'

	} catch (e) {
    slackSend color: 'danger', message: 'Build KO :('
    throw e
	}

	stage 'Serve'
	withEnv(["PATH+NODE=${tool name: 'node'}"]) {
	    sh 'nohup node app.js &'
	}
	
	sleep 5

	def toadAddress = env.JENKINS_URL.replace('jenkins','toad')
    def statusCode = sh returnStdout: true, script: "curl -s -o /dev/null -I -w '%{http_code}' "+toadAddress 
    if (!statusCode.equals("200")){
        slackSend color: 'warning', message: 'Le serveur ne se lance pas correctement -> '+toadAddress
    }
}
timeout(time: 1, unit: 'HOURS') {
    stage 'Kill'
	input 'Kill?'
	sh 'killall node'
}


