describe('Review API Test', () => {
  test('create new user', async (done) => {
    expect(true).toBe(true);
  });

  test('should create new user', async (done) => {
    const response = await request(app).post('/user')
    .send({
        username: "testName",
        icon    : "http://localhost:3000/",
        tier    : "testTier"
    });
    
    expect(response.status).toEqual(201);
    expect(response.body.success).toEqual(true);
    done();
  });
});
