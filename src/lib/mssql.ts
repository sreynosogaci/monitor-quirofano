// import fs from 'fs/promises'
// import path from 'path'    
// import mssql from 'mssql'

// export class GACISqlServerClient {
//     private static instance: GACISqlServerClient
//     private poolSql: mssql.ConnectionPool | undefined
//     private instanceId: string | undefined

//     private async connect() {
//         try {
//             // Ruta de la carpeta donde se encuentra el archivo json
//             const folderPath = path.join(process.cwd(), 'src', 'lib')
//             console.log(folderPath)

//             // Lectura de archivo json
//             const filePath      = await fs.readFile(`${folderPath}/connection.json`, 'utf8')
//             console.log(filePath)
//             const configuration = JSON.parse(filePath)
//             const sqlConfig = {
//                 user: configuration.user,
//                 password: configuration.password,
//                 database: configuration.database,
//                 server: configuration.server,
//                 port: configuration.port,
//                 pool: {
//                     max: 10,
//                     min: 0,
//                     idleTimeoutMillis: 30000,
//                 },
//                 options: {
//                     trustServerCertificate: true, // change to true for local dev / self-signed certs
//                 },
//             }

//             this.poolSql = await mssql.connect(sqlConfig)

//             // Cerrar la conexión cuando se cierre el programa
//             process.on('exit', () => {
//                 if (this.poolSql) {
//                     this.poolSql.close()
//                 }
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     private constructor() {
//         this.instanceId = Math.random().toString(36).substring(7)
//     }

//     static async getInstance() {
//         console.log('getInstance')
//         if (!GACISqlServerClient.instance) {
//             console.log('getInstance - !GACISqlServerClient.instance')
//             GACISqlServerClient.instance = new GACISqlServerClient()
//             await GACISqlServerClient.instance.connect()
//         }
//         return GACISqlServerClient.instance
//     }

//     async query<T>(query: string): Promise<{ data: T[] | null; error: string | null; rowsAffected: number }>{
//         console.log('query')
//         console.log(this.instanceId)
//         try {
//             if (this.poolSql) {
//                 const result = await this.poolSql.request().query(query)
//                 return {
//                     data: result.recordset,
//                     rowsAffected: result.rowsAffected[0],
//                     error: null
//                 }
//             }

//             return { data: [], error: 'Error de conexión a la base de datos', rowsAffected: 0 }
//         } catch (error) {
//             return { data: null, error: (error as Error).message, rowsAffected: 0 }
//         }
//     }
// }