# 📌 Proyecto Riwi Sportsline – Backend con NestJS

Este proyecto implementa un backend escalable y mantenible con **NestJS**, siguiendo estándares profesionales de calidad, seguridad y documentación.  
Se han configurado herramientas de análisis estático, pruebas unitarias, control de commits y cobertura de código para garantizar la confiabilidad del sistema.

---

## 🚀 Objetivos de Migración

1. **Configurar análisis de código estático con SonarQube**  
   - Integración con `sonar-scanner`.  
   - Reglas de calidad: cobertura mínima >80%, duplicación, complejidad.  
   - Reportes automáticos en CI/CD.

2. **Realizar pruebas unitarias e integración**  
   - Cobertura mínima exigida por SonarQube.  
   - Casos de éxito y error en servicios, guards e interceptores.  
   - Uso de `getRepositoryToken` para mockear repositorios.  
   - Validación de DTOs y entidades.

3. **Implementar Husky y pre-commit hooks para control de calidad**  
   - Hook `pre-commit` ejecuta:
     - `npm run lint` (ESLint/Prettier).  
     - `npm run test` (unit tests).  
     - `npm run sonar` (opcional).  
   - Bloqueo de commits si falla linting o tests.  
   - Opcional: `commitlint` para estandarizar mensajes de commit.

---

## 🛠️ Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repo>
   cd riwi-sportsline


---

Calidad y Cobertura
SonarQube: cobertura mínima >80%.

ESLint/Prettier: reglas estrictas de tipado y estilo.

Husky: bloquea commits si falla linting o tests.

Commitlint: mensajes de commit estandarizados.

---

AUTOR Steven Hidalgo Sánchez CLAN: Linus 
NestJs


