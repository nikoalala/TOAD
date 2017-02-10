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


