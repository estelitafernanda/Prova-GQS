const request = require('supertest');
const app = require('../src/app');

describe('API Integration Tests', () => {
  it('GET /pedidos deve retornar uma lista de pedidos', async () => {
    const response = await request(app).get('/pedidos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /pedidos deve criar um novo pedido', async () => {
    const newPedido = {
      endereco: {
        latitude: -23.550520,
        longitude: -46.633308
      },
      produto: 'Produto Teste',
      quantidade: 1
    };
    const response = await request(app).post('/pedidos').send(newPedido);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(newPedido));
  });

  it('GET /rotas deve retornar uma lista de rotas', async () => {
    const response = await request(app).get('/rotas');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /rotas deve retornar uma nova rota', async () => {
    const newRota = {
      latitude: -23.550520,
      longitude: -46.633308
    };
    const response = await request(app).post('/rotas').send(newRota);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(newRota));
  });

  it('GET /melhor-rota/:id deve retornar a melhor rota', async () => {
    const rotaId = 1; 
    const response = await request(app).get(`/melhor-rota/${rotaId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ message: 'Melhor rota calculada' }));
  });
});