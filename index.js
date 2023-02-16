const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))

app.use(cors())

const credentials = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'dairo'
}

app.get('/', (req, res) => {
	res.send('hola desde tu primera ruta de la Api')
})

app.post('/api/login', (req, res) => {
	const { username, password } = req.body
	const values = [username, password]
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM usuarios WHERE username = ? AND password = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"id": result[0].id,
					"user": result[0].user,
					"username": result[0].username
				})
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
	connection.end()
})
app.get



app.get('/productos', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM productos', (error, result) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.status(200).send(result)
		}
	})
	connection.end()
})


app.listen(4000, () => console.log('hola soy el servidor'))