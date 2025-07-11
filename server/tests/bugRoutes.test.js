const request = require('supertest');
const express = require('express');
const bugRoutes = require('../routes/bugRoutes');

jest.mock('../models/Bug');
const Bug = require('../models/Bug');

const app = express();
app.use(express.json());
app.use('/api/bugs', bugRoutes);

describe('Bug API Integration', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/bugs', () => {
    it('should create a new bug', async () => {
      Bug.prototype.save = jest.fn().mockResolvedValue({
        _id: '1',
        title: 'Bug title',
        description: 'Bug desc',
        priority: 'High',
      });
      const res = await request(app)
        .post('/api/bugs')
        .send({ title: 'Bug title', description: 'Bug desc', priority: 'High' });
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe('Bug title');
    });
  });

  describe('GET /api/bugs', () => {
    it('should return all bugs', async () => {
      Bug.find = jest.fn().mockResolvedValue([
        { _id: '1', title: 'Bug1', description: 'desc1', priority: 'Low' },
        { _id: '2', title: 'Bug2', description: 'desc2', priority: 'High' },
      ]);
      const res = await request(app).get('/api/bugs');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /api/bugs/:id', () => {
    it('should return a bug by id', async () => {
      Bug.findById = jest.fn().mockResolvedValue({
        _id: '1', title: 'Bug1', description: 'desc1', priority: 'Low'
      });
      const res = await request(app).get('/api/bugs/1');
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe('1');
    });
    it('should return 404 if bug not found', async () => {
      Bug.findById = jest.fn().mockResolvedValue(null);
      const res = await request(app).get('/api/bugs/999');
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Bug not found');
    });
  });
}); 