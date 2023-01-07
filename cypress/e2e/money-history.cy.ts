describe('Money history', () => {
  const user = {
    id: 1,
    login: 'cedric',
    money: 1000,
    registrationInstant: '2015-12-01T11:00:00Z',
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'
  };

  function startBackend(): void {
    cy.intercept('GET', 'api/money/history', [
      { instant: '2021-01-08T15:20:29.034219Z', money: 9800 },
      { instant: '2021-02-04T17:38:30.012766Z', money: 9600 },
      { instant: '2021-04-03T07:59:31.024788Z', money: 10400 },
      { instant: '2021-04-12T07:34:29.017760Z', money: 11200 },
      { instant: '2021-04-22T15:53:30.012061Z', money: 11000 }
    ]).as('history');
  }

  function storeUserInLocalStorage(): void {
    localStorage.setItem('rememberMe', JSON.stringify(user));
  }

  beforeEach(() => startBackend());

  it('should display the money history of the user', () => {
    storeUserInLocalStorage();
    cy.visit('/users/money/history');
    cy.wait('@history');
    cy.get('h1').should('contain', 'Money history');
    cy.get('canvas').should('exist');
  });
});
