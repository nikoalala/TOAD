node {
	
	stage 'Checkout'
	checkout scm

	stage 'Build'
	sh 'npm install'

	stage 'Serve'
	withEnv(["PATH+NODE=${tool name: 'node'}"]) {
    	sh 'node app.js'
  	}

	stage 'Kill'
	input 'Kill?'
	sh 'sudo killall node'
	
}