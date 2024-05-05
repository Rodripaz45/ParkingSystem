import { pool } from "../db.js";

export const getTopOfertantes = async (req, res) => {
    try {
        const query = `
            SELECT u.nombre AS nombre_ofertante,
                   COUNT(r.FK_ID_Garaje) AS total_reservaciones,
                   AVG(cg.Calificacion) AS promedio_calificacion_garajes
            FROM usuario u
            INNER JOIN Garajes g ON u.id = g.FK_ID_Usuario
            LEFT JOIN Reservaciones r ON g.ID_Garaje = r.FK_ID_Garaje
            LEFT JOIN Calificacion_Garaje cg ON g.ID_Garaje = cg.FK_ID_Garaje
            GROUP BY u.id
            HAVING AVG(cg.Calificacion) IS NOT NULL
            ORDER BY promedio_calificacion_garajes DESC
            LIMIT 20;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los 20 ofertantes:', error);
        res.status(500).send('Error en el servidor');
    }
};


export const getTopClientes = async (req, res) => {
    try {
        const query = `
            SELECT u.nombre AS nombre_cliente,
                   COUNT(a.ID_Auto) AS total_reservaciones,
                   AVG(cc.Calificacion) AS promedio_calificacion_clientes
            FROM usuario u
            INNER JOIN Autos a ON u.id = a.FK_ID_Usuario
            LEFT JOIN Reservaciones r ON a.ID_Auto = r.FK_ID_Auto
            LEFT JOIN Calificacion_Cliente cc ON u.id = cc.FK_ID_Usuario
            GROUP BY u.id
            HAVING AVG(cc.Calificacion) IS NOT NULL
            ORDER BY promedio_calificacion_clientes DESC
            LIMIT 20;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los 20 clientes:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const getTopOfertantesMalos = async (req, res) => {
    try {
        const query = `
            SELECT u.nombre AS nombre_ofertante,
                   COUNT(r.FK_ID_Garaje) AS total_reservaciones,
                   AVG(cg.Calificacion) AS promedio_calificacion_garajes
            FROM usuario u
            INNER JOIN Garajes g ON u.id = g.FK_ID_Usuario
            LEFT JOIN Reservaciones r ON g.ID_Garaje = r.FK_ID_Garaje
            LEFT JOIN Calificacion_Garaje cg ON g.ID_Garaje = cg.FK_ID_Garaje
            GROUP BY u.id
            HAVING AVG(cg.Calificacion) IS NOT NULL
            ORDER BY promedio_calificacion_garajes ASC
            LIMIT 20;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los 20 ofertantes:', error);
        res.status(500).send('Error en el servidor');
    }
};


export const getTopClientesMalos = async (req, res) => {
    try {
        const query = `
            SELECT u.nombre AS nombre_cliente,
                   COUNT(a.ID_Auto) AS total_reservaciones,
                   AVG(cc.Calificacion) AS promedio_calificacion_clientes
            FROM usuario u
            INNER JOIN Autos a ON u.id = a.FK_ID_Usuario
            LEFT JOIN Reservaciones r ON a.ID_Auto = r.FK_ID_Auto
            LEFT JOIN Calificacion_Cliente cc ON u.id = cc.FK_ID_Usuario
            GROUP BY u.id
            HAVING AVG(cc.Calificacion) IS NOT NULL
            ORDER BY promedio_calificacion_clientes ASC
            LIMIT 20;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los 20 clientes:', error);
        res.status(500).send('Error en el servidor');
    }
};