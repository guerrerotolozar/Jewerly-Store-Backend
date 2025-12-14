const validatePassword = (password = '') => {
    // paso 1: Debe existir y ser string
    if (typeof password !== 'string') {
        return { validacion: false, msg: 'La contraseña es obligatoria' };
    }

    // paso 2: Longitud mínima
    if (password.length < 8) {
        return { validacion: false, msg: 'La contraseña debe tener al menos 6 caracteres' };
    }

    // paso 3: Al menos una minúscula
    if (!/[a-z]/.test(password)) {
        return { validacion: false, msg: 'La contraseña debe tener al menos una minúscula' };
    }

    // paso 4: Al menos una mayúscula
    if (!/[A-Z]/.test(password)) {
        return { validacion: false, msg: 'La contraseña debe tener al menos una mayúscula' };
    }

    // paso 5: Al menos un número (opcional, pero recomendado)
    if (!/[0-9]/.test(password)) {
        return { validacion: false, msg: 'La contraseña debe tener al menos un número' };
    }

    // paso 6: Al menos un símbolo especial
    // (puedes ajustar la lista de símbolos permitidos)
    if (!/[!¡#$%&¿?]/.test(password)) {
        return { validacion: false, msg: 'La contraseña debe tener al menos un símbolo especial' };
    }

    return { validacion: true, msg: 'Contraseña válida' };
};

export default validatePassword
