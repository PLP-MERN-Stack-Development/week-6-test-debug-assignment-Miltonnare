const { registerUsers } = require('../controllers/userController');

describe('User Registration Validation', () => {
  it('should return 400 if any field is missing', async () => {
    // Mock req and res
    const req = { body: { name: '', email: '', password: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await registerUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required.' });
  });
}); 