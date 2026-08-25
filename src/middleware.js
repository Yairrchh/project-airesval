export { default } from "next-auth/middleware"

// Protección de rutas desactivada temporalmente para desarrollo local / portafolio.
// Para reactivarla, descomentar el matcher de abajo.
export const config = { matcher: [] }
// export const config = { matcher: ["/cpv","/cpv/technicalSheet","/cpv/newTechnicalSheet"] }