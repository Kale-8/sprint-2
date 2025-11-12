//Prueba captura excepciones devuelve el format correcto y usa response.status().json() como se espera.
import { GlobalExceptionFilter } from './http-exception.filter';
import { ArgumentsHost, HttpException } from '@nestjs/common';

describe('GlobalExceptionFilter', () => {
  it('debería formatear la excepción correctamente', () => {
    const filter = new GlobalExceptionFilter();
    const exception = new HttpException('Error personalizado', 400);

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockRequest = {
      url: '/cliente',
    };

    const mockHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    } as ArgumentsHost;

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: 400,
      message: 'Error personalizado',
      path: '/cliente',
      timestamp: expect.any(String),
    });
  });
});
