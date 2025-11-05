# Políticas de Git Branching y Git Flow

Estas políticas definen la forma de trabajo colaborativo en los repositorios de cada célula de desarrollo (cell). El objetivo es mantener un flujo de trabajo ordenado, claro y fácilmente integrable entre los miembros del equipo.

---

## Estructura General

- **Repositorio por célula:**  
  Cada célula de desarrollo debe tener su propio repositorio independiente.

- **Rama principal por miembro del cell:**  
  Cada miembro del equipo mantiene su propia rama principal derivada de `main`.  
  **Ejemplo:** `main-sam`, `main-lina`, `main-juan`.

---

## Flujo de Desarrollo

1. **Una rama por Historia de Usuario (HU):**  
   Cada HU debe desarrollarse en una rama específica y única.  
   **Ejemplo:** `feature/HU-001-crear-login`

2. **Un Pull Request (PR) por HU:**  
   Cada HU debe integrarse mediante un PR independiente hacia la rama principal del miembro (`main-[nombre]`).

3. **Un commit por cada *feat* (funcionalidad):**  
   Los commits deben representar unidades completas de valor funcional, siguiendo el formato:

   ```bash
   feat: descripción breve de la funcionalidad
   ```

---

## Integración y Fusión

- **Fusión en rama principal del miembro:**  
  Cada miembro debe mantener actualizada su rama principal (main-[nombre]) fusionando todos los PRs de sus HU aprobadas.

- **Sincronización entre miembros del cell:**  
  Periódicamente, las ramas principales de los miembros se integrarán entre sí o hacia un main global del proyecto, según el flujo definido por el líder técnico o DevOps.

---

## Ejemplo de Flujo Simplificado

```bash
# Crear rama desde la principal del miembro
git checkout -b feature/HU-001-crear-login main-sam

# Implementar la funcionalidad
# ...

# Commit del feature
git commit -m "feat: implementar formulario de login con validaciones"

# Subir rama
git push origin feature/HU-001-crear-login

# Crear PR hacia main-sam
# Revisar, aprobar y fusionar
```