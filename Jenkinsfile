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

	try {
		stage 'Serve'
		withEnv(["PATH+NODE=${tool name: 'node'}"]) {
	    	sh 'nohup node app.js &'
	  	}
    	slackSend color: 'good', message: 'Build Ok & Serveur Up (<a href="${env.BUILD_URL}">#${env.BUILD_NUMBER}</a>)'
	} catch (e) {
    	slackSend color: 'warning', message: 'Build Ok mais serveur down :/'
    	throw e
	}
}
timeout(time: 1, unit: 'HOURS') {
    stage 'Kill'
	input 'Kill?'
	sh 'killall node'
}


