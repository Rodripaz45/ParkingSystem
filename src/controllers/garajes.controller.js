//@ts-check

import { pool } from "../db.js";

export const addGaraje = async (req, res) => {
    const { direccion, lat, lng, dimensiones, caracteristicasAdicionales, disponibilidad, usuarioId } = req.body;
    if (!direccion || !usuarioId) {
        return res.status(400).json({ message: 'La dirección y el ID del usuario son obligatorios' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO garajes (fk_id_usuario, direccion, lat, lng, dimensiones, caracteristicasadicionales, disponibilidad) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_garaje',
            [usuarioId, direccion, lat, lng, dimensiones, caracteristicasAdicionales, disponibilidad]
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

export const getAllGarajes = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT g.*, u.telefono,
                (SELECT AVG(r.precio)
                FROM reservaciones r
                WHERE r.fk_id_garaje = g.id_garaje AND r.estado = 'CONFIRMADO'
                ) AS promedio_precio_confirmado
            FROM garajes g
            JOIN usuario u ON g.fk_id_usuario = u.id;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener garajes:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Obtener un garaje por ID
export const getGarajesById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM garajes WHERE fk_id_usuario = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).send('No se encontraron garajes para este usuario');
        }
    } catch (error) {
        console.error('Error al obtener garajes por usuario:', error);
        res.status(500).send('Error en el servidor');
    }
};


export const getGarajesOcupados = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM garajes WHERE disponibilidad = $1',
            ['OCUPADO']
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener garajes ocupados:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const getGarajesDisponibles = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT g.*, u.telefono FROM garajes g INNER JOIN usuario u ON g.fk_id_usuario = u.id WHERE g.disponibilidad = $1;',
            ['DISPONIBLE']
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener garajes disponibles:', error);
        res.status(500).send('Error en el servidor');
    }
};


// Actualizar un garaje
export const updateGaraje = async (req, res) => {
    const { id } = req.params;
    const { direccion, lat, lng, dimensiones, caracteristicasAdicionales, disponibilidad } = req.body;
    try {
        const result = await pool.query(
            'UPDATE garajes SET direccion = $1, lat = $2, lng = $3, dimensiones = $4, caracteristicasadicionales = $5, disponibilidad = $6 WHERE id_garaje = $7 RETURNING *',
            [direccion, lat, lng, dimensiones, caracteristicasAdicionales, disponibilidad, id]
        );
        if (result.rows.length > 0) {
            res.json({ message: 'Garaje actualizado correctamente', garaje: result.rows[0] });
        } else {
            res.status(404).send('Garaje no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar garaje:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const setGarajeDisponible = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE garajes SET disponibilidad = $1 WHERE id_garaje = $2 RETURNING *',
            ['DISPONIBLE', id]
        );
        if (result.rows.length > 0) {
            res.json({ message: 'Garaje marcado como disponible correctamente', garaje: result.rows[0] });
        } else {
            res.status(404).send('Garaje no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar disponibilidad del garaje:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const setGarajeOcupado = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE garajes SET disponibilidad = $1 WHERE id_garaje = $2 RETURNING *',
            ['OCUPADO', id]
        );
        if (result.rows.length > 0) {
            res.json({ message: 'Garaje marcado como ocupado correctamente', garaje: result.rows[0] });
        } else {
            res.status(404).send('Garaje no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar disponibilidad del garaje:', error);
        res.status(500).send('Error en el servidor');
    }
};


// Eliminar un garaje
export const deleteGaraje = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM garajes WHERE id_garaje = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Garaje eliminado correctamente' });
        } else {
            res.status(404).send('Garaje no encontrado');
        }
    } catch (error) {
        console.error('Error al eliminar garaje:', error);
        res.status(500).send('Error en el servidor');
    }
};

