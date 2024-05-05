//@ts-check
import { pool } from "../db.js";

export const getTotalConfirmedReservations = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT u.id, u.nombre, COUNT(r.id_reservacion) AS total_reservaciones_confirmadas
            FROM usuario u
            LEFT JOIN garajes g ON u.id = g.fk_id_usuario
            LEFT JOIN reservaciones r ON g.id_garaje = r.fk_id_garaje AND r.estado = 'CONFIRMADO'
            GROUP BY u.id, u.nombre
            ORDER BY total_reservaciones_confirmadas DESC;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener reservaciones confirmadas por usuario:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const getTotalRejectedReservations = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT u.id, u.nombre, COUNT(r.id_reservacion) AS total_reservaciones_rechazadas
            FROM usuario u
            LEFT JOIN garajes g ON u.id = g.fk_id_usuario
            LEFT JOIN reservaciones r ON g.id_garaje = r.fk_id_garaje AND r.estado = 'RECHAZADO'
            GROUP BY u.id, u.nombre
            ORDER BY total_reservaciones_rechazadas DESC;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener reservaciones rechazadas por usuario:', error);
        res.status(500).send('Error en el servidor');
    }
};


export const getGarajesDisponibles = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT COUNT(*) AS cantidad_disponibles
            FROM garajes
            WHERE disponibilidad = 'DISPONIBLE';
        `);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener garajes disponibles:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const getGarajesOcupados = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT COUNT(*) AS cantidad_ocupados
            FROM garajes
            WHERE disponibilidad = 'OCUPADO';
        `);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener garajes ocupados:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const getRechazosPorCliente = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT COUNT(*) AS rechazos_cliente
            FROM reservaciones
            WHERE estado = 'CANCELADA';
        `);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener rechazos por cliente:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const getRechazosPorOfertantes = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT COUNT(*) AS rechazos_ofertantes
            FROM reservaciones
            WHERE estado = 'RECHAZADO';
        `);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener rechazos por ofertantes:', error);
        res.status(500).send('Error en el servidor');
    }
};
