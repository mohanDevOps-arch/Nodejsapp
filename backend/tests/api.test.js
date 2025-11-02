const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  
  test('GET /health should return OK', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Welcome to the API');
  });

  test('GET /api/users should return users array', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('GET /api/users/:id should return specific user', async () => {
    const response = await request(app).get('/api/users/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.id).toBe(1);
  });

  test('POST /api/users should create new user', async () => {
    const newUser = { name: 'Test User', email: 'test@example.com' };
    const response = await request(app)
      .post('/api/users')
      .send(newUser);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('Test User');
  });
});