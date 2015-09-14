build: index.js
	node node_modules/browserify/bin/cmd.js index.js -o index.build.js

server:
	python -m SimpleHTTPServer
