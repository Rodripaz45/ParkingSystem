import { pool } from "../db.js";

export const addGaraje = async (req, res) => {
    const { direccion, lat, lng, dimensiones, caracteristicasAdicionales, disponibilidad, usuarioId } = req.body;
    if (!direccion || !usuarioId) {
        return res.status(400).json({ message: 'La dirección y el ID del usuario son obligatorios' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO garajes (direccion, lat, lng, dimensiones, caracteristicas_adicionales, disponibilidad, usuario_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            [direccion, lat, lng, dimensiones, caracteristicasAdicionales, disponibilidad, usuarioId]
        );
        const garajeId = result.rows[0].id;
        res.status(201).json({ id: garajeId, message: 'Garaje agregado correctamente' });
    } catch (error) {
        if (error.code === '23505') {
            res.status(409).send('Ya existe un garaje con esos datos');
        } else {
            console.error('Error al insertar garaje en la base de datos:', error);
            res.status(500).send('Error en el servidor');
        }
    }
};

