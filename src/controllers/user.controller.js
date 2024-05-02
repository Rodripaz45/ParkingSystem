//@ts-check
import { pool } from "../db.js";
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const { email, password, nombre, telefono } = req.body;

    try {
        // Genera un hash de la contraseña utilizando bcrypt
        const hashedPassword = await bcrypt.hash(password, 6);

        // Ejecuta una consulta SQL para insertar el correo electrónico, contraseña, nombre y teléfono en la tabla de usuarios
        const result = await pool.query('INSERT INTO usuario (email, password, nombre, telefono) VALUES ($1, $2, $3, $4) RETURNING id', [email, hashedPassword, nombre, telefono]);

        const usuarioId = result.rows[0].id;

        res.status(201).json({ id: usuarioId, message: 'Usuario registrado correctamente' });
    } catch (error) {
        // Manejo de errores
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).send('Error en el servidor');
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Realiza la consulta SQL para seleccionar el usuario por su email
        const { rows } = await pool.query('SELECT id, password FROM usuario WHERE email = $1', [email]);

        // Verifica si se encontró algún usuario con el email proporcionado
        if (rows.length > 0) {
            // Verifica si la contraseña proporcionada coincide con la contraseña almacenada (hasheada)
            const user = rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.json({ id: user.id, message: 'Inicio de sesión exitoso' });
            } else {
                // Si las contraseñas no coinciden, devuelve un mensaje de error
                res.status(404).send({message: 'Credenciales invalidas'});
            }
        } else {
            // No se encontró ningún usuario con ese email
            res.status(404).send({message: 'Credenciales invalidas'});
        }
    } catch (error) {
        // Manejo de errores
        console.error('Error en la consulta SQL:', error);
        res.status(500).send({message: 'Error en el servidor'});
    }
};
