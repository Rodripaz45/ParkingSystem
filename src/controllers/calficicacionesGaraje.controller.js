//@ts-check
import { pool } from "../db.js";

export const createCalificacionGaraje = async (req, res) => {
    const { fk_id_garaje, calificacion } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO calificacion_garaje (fk_id_garaje, calificacion) VALUES ($1, $2) RETURNING id',
            [fk_id_garaje, calificacion]
        );
        const calificacionId = result.rows[0].id;
        res.status(201).json({ id: calificacionId, message: 'Calificación creada correctamente' });
    } catch (error) {
        console.error('Error al crear calificación:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const getAllCalificacionesGaraje = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM calificacion_garaje');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener calificaciones:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const updateCalificacionGaraje = async (req, res) => {
    const { id } = req.params;
    const { calificacion } = req.body;
    try {
        const result = await pool.query(
            'UPDATE calificacion_garaje SET calificacion = $1 WHERE id = $2 RETURNING *',
            [calificacion, id]
        );
        if (result.rows.length > 0) {
            res.json({ message: 'Calificación actualizada correctamente', calificacion: result.rows[0] });
        } else {
            res.status(404).send('Calificación no encontrada');
        }
    } catch (error) {
        console.error('Error al actualizar calificación:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const deleteCalificacionGaraje = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM calificacion_garaje WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Calificación eliminada correctamente' });
        } else {
            res.status(404).send('Calificación no encontrada');
        }
    } catch (error) {
        console.error('Error al eliminar calificación:', error);
        res.status(500).send('Error en el servidor');
    }
};
