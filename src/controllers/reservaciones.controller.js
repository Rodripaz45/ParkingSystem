import { pool } from "../db.js";

export const createReservacion = async (req, res) => {
    const { fk_id_garaje, fk_id_auto, start_time, end_time, horas_disponibles, status, precio } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO reservaciones (fk_id_garaje, fk_id_auto, start_time, end_time, horas_disponibles, status, precio) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            [fk_id_garaje, fk_id_auto, start_time, end_time, horas_disponibles, status, precio]
        );
        const reservacionId = result.rows[0].id;
        res.status(201).json({ id: reservacionId, message: 'Reservación creada correctamente' });
    } catch (error) {
        console.error('Error al crear reservación:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const getAllReservaciones = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reservaciones');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener reservaciones:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const getReservacionById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM reservaciones WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Reservación no encontrada');
        }
    } catch (error) {
        console.error('Error al obtener reservación:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const updateReservacion = async (req, res) => {
    const { id } = req.params;
    const { status, precio } = req.body; // Asumiendo que queremos permitir actualizar solo el estado y precio.
    try {
        const result = await pool.query(
            'UPDATE reservaciones SET status = $1, precio = $2 WHERE id = $3 RETURNING *',
            [status, precio, id]
        );
        if (result.rows.length > 0) {
            res.json({ message: 'Reservación actualizada correctamente', reservacion: result.rows[0] });
        } else {
            res.status(404).send('Reservación no encontrada');
        }
    } catch (error) {
        console.error('Error al actualizar reservación:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const deleteReservacion = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM reservaciones WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Reservación eliminada correctamente' });
        } else {
            res.status(404).send('Reservación no encontrada');
        }
    } catch (error) {
        console.error('Error al eliminar reservación:', error);
        res.status(500).send('Error en el servidor');
    }
};
