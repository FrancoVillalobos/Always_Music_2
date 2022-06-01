const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "admin",
    port: 5432,
    database: "alwaysmusic",
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
});
// consulta para agregar un estudiante
const agregar = async (nombre, rut, curso, nivel) => {
    const consulta = {
        name: 'fetch-user',
        rowMode: 'array',
        text: "INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *",
        values: [nombre, rut, curso, nivel],
    };    
    try {
        const result = await pool.query(consulta)
        return result.rows;
    } catch (error) {
        return `Error al crear estudiante. codigo: ${error.code}`;
    }
}

// consulta un estudiante con su rut
const buscar = async (rut) => {
    //console.log(rut)
    const consulta = {
        name: 'fetch-user',
        rowMode: 'array',
        text: "SELECT * FROM estudiantes WHERE rut = $1",
        values: [rut],
    }; 
    try {
        const result = await pool.query(consulta);
        return result.rows[0] ? result.rows[0] : 'Rut no existe';
    } catch (error) {
        return `Error en la consulta: ${error}`;
    }
}

// Consultar toda la tabla estudiantes
const consultar = async () => {
    const consulta = {
        name: 'fetch-user',
        rowMode: 'array',
        text: "SELECT * FROM estudiantes;",
    };     
    try {
        const result = await pool.query(consulta);
        return result.rows;
    } catch (error) {
        return `Error en la consulta. Código: ${error.code} ${error.message}`;
    }
}

// Editar estudiante por su rut
const editar = async (nombre, rut, curso, nivel) => {
    const consulta = {
        name: 'fetch-user',
        rowMode: 'array',
        text: "UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4 RETURNING *;",
        values: [nombre, curso, nivel, rut],
    };  
    try {
        const result = await pool.query(consulta);
        if (!result.rowCount){
            return `El rut ${rut} no se encuentra registrado`;
        }
        return `Estudiante ${nombre} editado con éxito`;
    } catch (error) {
        return `No se pudo editar. Error: ${error.code}`;
    }    
}

// Eliminar estudiante por rut
const eliminar = async (rut) => {
    const consulta = {
        name: 'fetch-user',
        rowMode: 'array',
        text: "DELETE FROM estudiantes WHERE rut = $1",
        values: [rut],
    }; 
    try {
        const result = await pool.query(consulta);
        if (!result.rowCount) {
            return `El rut ${rut} no se encuentra registrado`;
        }            
        return `Estudiante con Rut: ${rut} eliminado con éxito`;
    } catch (error) {
        return `No se pudo eliminar. Error codigo: ${error.code}`;
    }
}

module.exports = { agregar, buscar, consultar, editar, eliminar }