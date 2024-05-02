import { pool } from "../db.js";

import { check, validationResult } from 'express-validator';

export const validateAuto = [
    check('placa').isLength({ min: 6 }).withMessage('La placa debe tener al menos 6 caracteres'),
    check('modelo').not().isEmpty().withMessage('El modelo es requerido'),
    check('dimensiones').not().isEmpty().withMessage('Las dimensiones son requeridas')
];

export const addAuto = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { placa, modelo, dimensiones, usuarioId } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO autos (placa, modelo, dimensiones, usuario_id) VALUES ($1, $2, $3, $4) RETURNING id',
            [placa, modelo, dimensiones, usuarioId]
        );
        const autoId = result.rows[0].id;
        res.status(201).json({ id: autoId, message: 'Auto registrado correctamente' });
    } catch (error) {
        console.error('Error al insertar auto en la base de datos:', error);
        res.status(500).send('Error en el servidor');
    }
};
// Obtener todos los autos
export const getAllAutos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM autos');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener autos:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Obtener un auto por ID
export const getAutoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM autos WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Auto no encontrado');
        }
    } catch (error) {
        console.error('Error al obtener auto:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Actualizar un auto
export const updateAuto = async (req, res) => {
    const { id } = req.params;
    const { placa, modelo, dimensiones } = req.body;
    try {
        const result = await pool.query(
            'UPDATE autos SET placa = $1, modelo = $2, dimensiones = $3 WHERE id = $4 RETURNING *',
            [placa, modelo, dimensiones, id]
        );
        if (result.rows.length > 0) {
            res.json({ message: 'Auto actualizado correctamente', auto: result.rows[0] });
        } else {
            res.status(404).send('Auto no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar auto:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Eliminar un auto
export const deleteAuto = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM autos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Auto eliminado correctamente' });
        } else {
            res.status(404).send('Auto no encontrado');
        }
    } catch (error) {
        console.error('Error al eliminar auto:', error);
        res.status(500).send('Error en el servidor');
    }
};
