import SurrealDB from 'surrealdb'

var Surreal: any = {}

try {
  Surreal = new SurrealDB('http://127.0.0.1:8000', {
    user: 'root',
    pass: 'root',
    database: 'test',
    namespace: 'test',
  })

  Surreal.CreateRecord(`apps`, undefined, {
    name: 'Node.js HTTP Pass',
    scheme: 'http',
    type: ['react', 'python', 'node'][Math.floor(Math.random() * 3)],
    host: `127.0.0.1`,
    internal_port: 5173,
    external_port: 4556,
    server_names: ['home.jubot.site'],
  })
} catch {
  console.log(`Dang yo, unable to connect to surrealdb`)
}

export default Surreal
