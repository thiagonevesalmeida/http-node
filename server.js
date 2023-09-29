const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')


http.createServer((req, res) => {
	// rota Homepage
	const file = req.url === '/'? 'index.html' : req.url
	const filePath = path.join(__dirname, 'web', file)
	const extname = path.extname(filePath)

	const allowFileTypes = ['.html', '.css', '.js']
	const allowed = allowFileTypes.find(element => element === extname)

	if (!allowed) {
		return
	}

	fs.readFile(filePath, (err, content) => {
		if (err) throw err

		res.end(content)
	})
	
}).listen(5000, () => console.log('Running server at http://localhost:5000'))