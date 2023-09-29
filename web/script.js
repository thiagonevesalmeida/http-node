const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load() {
	const res = await fetch('http://localhost:3000/').then(response => response.json())
	
	res.urls.map(({name, url}) => addElement({ name, url }))
}

function checkUrl(name, url) {
	const isDuplicate = Array.from(document.querySelectorAll('a'))
	.every(element => element.href !== url + '/');

	return isDuplicate
}

function addElement({ name, url }) {
	const newUrl = checkUrl(name, url)

	if(!newUrl) {
		return alert("URL already registered")
	}

	const li = document.createElement('li')
	const a = document.createElement("a")
	const trash = document.createElement("span")

	a.href = url
	a.innerHTML = name
	a.target = "_blank"

	trash.innerHTML = "x"
	trash.onclick = () => removeElement(trash)

	li.append(a)
	li.append(trash)
	ul.append(li)
	

	fetch(`http://localhost:3000/?name=${name}&url=${url}`)
	console.log('Add URL' + name)
}

function removeElement(element) {
	const {textContent, href} = element.previousElementSibling

	if (confirm('Tem certeza que deseja deletar?')) {
		fetch(`http://localhost:3000/?name=${textContent}&url=${href}&del=1`)
		element.parentNode.remove()
	}
}

form.addEventListener("submit", (event) => {
	event.preventDefault();

	let { value } = input

	if (!value) 
		return alert('Preencha o campo')

	const [name, url] = value.split(",")

	if (!url) 
		return alert('formate o texto da maneira correta')

	if (!/^http/.test(url)) 
		return alert("Digite a url da maneira correta")

	addElement({ name, url })

	input.value = ""
})

// main
load()
