const http = require('node:http')
const URL = require('node:url')
const fs = require('node:fs')
const path = require('node:path')

const data = require('./db.json')

function writeFile(callback) {
	fs.writeFile(
		path.join(__dirname, 'db.json'), 
		JSON.stringify(data, null, 2),
		err => {
			if(err) throw err

			callback(JSON.stringify({message: "ok"}))
		}
	)
}

http.createServer((req, res) => {
	const {name, url, del} = URL.parse(req.url, true).query

	res.writeHead(200, {
		'Access-Control-Allow-Origin': '*'
	})

	//GET - return all resources from homepage
	if (!(name || url)) {
		return res.end(JSON.stringify(data)) 
	}

	//DELETE - delete source
	if (del) {
		data.urls = data.urls.filter(element => String(element.url + '/') !== String(url))
		return writeFile(message => res.end(message))
	}

	//POST - add source
	const newUrl = data.urls.every(element => String(element.url) !== String(url))
	if (newUrl) {
		data.urls.push({name, url})
	}
	return writeFile(message => res.end(message))
}).listen(3000, () => console.log('Running Api at http://localhost:3000'))