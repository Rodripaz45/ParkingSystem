import { pool } from "../db.js";

export const addAuto = async (req, res) => {
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
