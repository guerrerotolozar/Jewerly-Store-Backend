const validatePassword = (password = '') => {
    if (typeof password !== 'string') {
    return {
        validacion: false,
        msg: 'La contraseña es obligatoria'
    };
    }

    if (password.length < 6) {
    return {
        validacion: false,
        msg: 'La contraseña debe tener al menos 6 caracteres'
    };
    }

// aquí luego puedes añadir más reglas (número, mayúscula, etc.)
    return {
        validacion: true,
        msg: 'Contraseña válida'
    };
};

export default validatePassword