//Este archivo sirve para que jest pueda probar nuestro proyecto en TypeScript
import type { Config } from '@jest/types';

export const config: Config.InitialOptions = {
  preset: 'ts-jest',                //El lenguaje que usamos es TypeScript
  testEnvironment: 'node',              //Le decimos que se ejecutaran las pruebas en Node.js
  collectCoverage: true,                  //Calcula cuanto porcentaje del codigo esta cubierto por pruebas.
  coverageDirectory: 'coverage',              //Crea una carpeta coverage con los resultados 
  coverageReporters: ['lcov', 'text-summary'],                          //Crea un archivo que SonarQube entiende (lcov.info) y un resumen en texto.
  testMatch: ['**/__tests__/**/*.spec.ts', '**/?(*.)+(spec).ts'],     //Patrones para encontrar archivos de prueba 
  moduleFileExtensions: ['ts', 'js', 'json'],                //Extensiones de archivos que Jest reconocerá
  moduleNameMapper: {'^src/(.*)$': '<rootDir>/src/$1',  },
};

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
