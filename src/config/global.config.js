export const ROLES = {
    ADMIN: 'admin',
    COLLABORATOR: 'collaborator',
    REGISTERED: 'registered',
    CLIENT: 'cliente'
}

export const ALLOWED_ROLES = Object.values(ROLES);

// Roles que se asignan automáticamente a nuevos usuarios registrados
export const DEFAULT_ROLES = [ROLES.REGISTERED, ROLES.CLIENT];