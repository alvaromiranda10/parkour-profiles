# PARKOUR PROFILES
Aplicación de Gestión y Visualización de Información Personal
## Descripción

Esta aplicación web permite a los usuarios autenticarse, ingresar información personal y visualizarla en una lista. Desarrollada con Next.js 14 y React, la aplicación incluye autenticación, manejo de sesiones, subida y visualización de datos, y validación de formularios.

## Requerimientos Mínimos

- **Autenticación y Manejo de Sesión:**
  - ✅ Registro e inicio de sesión con correo electrónico.
  - ✅ Cierre de sesión seguro.
  - ✅ Utiliza Auth.js (NextAuth).

- **Subida de Datos a una Base de Datos:**
  - ✅ Agregar información personal como nombre, cédula, teléfono, dirección y salario.
  - ✅ Base de datos PostgreSQL .
  - ✅ Generación de reportes con los usuarios con mejor salario y cálculo de media y promedios.

- **Manejo de Formularios con Validaciones:**
  - ✅ Validación de campos para asegurar datos correctos. 
  - ✅ Mensajes de error claros para validaciones fallidas.

- **Presentación de Datos:**
  - ✅ Lista de entradas de información personal.
  - ✅ Implementación de [Data Table de Shadcn](https://ui.shadcn.com/docs/components/data-table).
  - ✅ Página con entradas ordenadas y barra de búsqueda por nombre.

- **Compilado Exitoso:**
  - ✅ Asegúrate de que no haya errores en el build.

## Requerimientos Opcionales

- **Internacionalización:**
  - ⬜️ Implementar traducciones entre español e inglés (no completado por limitaciones de tiempos).

- **Correos Transaccionales:**
  - ✅ Validar correos con un link de verificación usando [Resend](https://resend.com/) y [react-email](https://react.email/).

- **Gráfico de Salarios:**
  - ✅ Crear un gráfico mostrando la tendencia de los salarios (utilizando datos de reportes).

## Requisitos Técnicos

- **Tecnologías:** Next.js 14, React, TypeScript, Prisma, [Kirimase](https://kirimase.dev/).
- **Estilos:** TailwindCSS.
- **Autenticación:** Auth.js (NextAuth).
- **Base de Datos:** PostgreSQL.
- **Configuración de Entorno:** Asegúrate de que las variables de entorno estén configuradas correctamente.

## Entorno de Desarrolllo

- **Node.js:** v20.16.0
- **npm:** v10.8.1
- **Sistema Operativo:** macOS
- **Editor de Código:** Visual Studio Code

## Instalación y Ejecución

1. **Instalar Dependencias:**

    ```sh
    npm install --force
    ```

2. **Configurar Variables de Entorno:**
   - Crea un archivo `.env` en la raíz del proyecto y configura las variables necesarias.

3. **Generar y Migrar Base de Datos:**

    ```sh
    npm run db:generate
    npm run db:migrate
    ```

4. **Ejecutar la Aplicación en Desarrollo:**

    ```sh
    npm run dev
    ```
    
    Abrimos http://localhost:3000 para visualizar el proyecto.

## Siguientes pasos

- **Internacionalización:** No se implementó por falta de tiempo(en particular por ser nuevo en las tecnologias implementadas). Pero ya estaba trabajando en utilizar la libreria `next-intl` pero me faltaba resolver los mensajes de error generados la libreria `zod`
- ✅ ~~**Dependencias:** Hubo un conflicto con Prisma y zod-prisma, resuelto temporalmente con el flag `--force` al realizar el `npm install ...`. Se recomienda revisar las dependencias para una solución a largo plazo.~~
