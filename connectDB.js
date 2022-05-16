var sql = require('mssql/msnodesqlv8')
let maychu = 'MSI\\MAYCHU'
let tram1 = 'MSI\\TRAM1'
let tram2 = 'MSI\\TRAM22'
let tram3 = 'MSI\\TRAM33'

var config = (dbName)=>{
    return{
        server:dbName,
        user: 'sa',
        password: '12031999',
        database: 'QuanLyThuVien',
        drive: 'msnodesqlv8'
    }
} 

const connMaychu = new sql.ConnectionPool(config(maychu)).connect().then(
    pool=>{
        return pool 
    }
)

const connTram1 = new sql.ConnectionPool(config(tram1)).connect().then(
    pool=>{
        return pool 
    }
)

const connTram2 = new sql.ConnectionPool(config(tram2)).connect().then(
    pool=>{
        return pool 
    }
)

const connTram3 = new sql.ConnectionPool(config(tram3)).connect().then(
    pool=>{
        return pool 
    }
)

module.exports = {
    sql,
    connMaychu,
    connTram1,
    connTram2,
    connTram3
}