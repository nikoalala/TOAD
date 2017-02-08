node {

	stage 'Stop Server'
	sh 'killall node || true'

	stage 'Checkout'
	checkout scm

	stage 'Build'
	sh 'npm install'

	stage 'Serve'
	withEnv(["PATH+NODE=${tool name: 'node'}"]) {
    	sh 'nohup node app.js &'
  	}

}
timeout(time: 1, unit: 'HOURS') {
    stage 'Kill'
	input 'Kill?'
	sh 'killall node'
}


