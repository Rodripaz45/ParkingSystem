//@ts-check
import { pool } from "../db.js";

export const createCalificacionPropietario = async (req, res) => {
    const { fk_id_garaje, fk_id_usuario, calificacion } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO calificacion_propietario (fk_id_garaje, fk_id_usuario, calificacion) VALUES ($1, $2, $3) RETURNING id_calificacion_propietario',
            [fk_id_garaje, fk_id_usuario, calificacion]
        );
        const calificacionId = result.rows[0].id;
        res.status(201).json({ id: calificacionId, message: 'Calificación creada correctamente' });
    } catch (error) {
        console.error('Error al crear calificación:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const getAllCalificacionesPropietario = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM calificacion_propietario');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener calificaciones:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const updateCalificacionPropietario = async (req, res) => {
    const { id } = req.params;
    const { calificacion } = req.body;
    try {
        const result = await pool.query(
            'UPDATE calificacion_propietario SET calificacion = $1 WHERE id_calificacion_propietario = $2 RETURNING *',
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

export const deleteCalificacionPropietario = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM calificacion_propietario WHERE id_calificacion_propietario = $1 RETURNING *', [id]);
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

export const getAverageCalificacionPropietario = async (req, res) => {
    const { fk_id_usuario } = req.params;

    try {
        const result = await pool.query(
            'SELECT AVG(calificacion) as average FROM calificacion_propietario WHERE fk_id_usuario = $1',
            [fk_id_usuario]
        );
        if (result.rows.length > 0) {
            const average = parseFloat(result.rows[0].average).toFixed(2); // Formatea el promedio a dos decimales
            res.json({ fk_id_usuario, average, message: 'Promedio de calificaciones obtenido correctamente' });
        } else {
            res.status(404).send('No se encontraron calificaciones para este propietario');
        }
    } catch (error) {
        console.error('Error al obtener el promedio de calificaciones:', error);
        res.status(500).send('Error en el servidor');
    }
};

