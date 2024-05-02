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
