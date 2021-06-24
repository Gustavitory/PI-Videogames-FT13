/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });
});
describe('POST /videogames', () => {
  it('responds with 200', () => agent.post('/pokemons').expect(200))
  it('should return the detail of the game', () => 
    agent.post('/videogames/add')
    .send({
      name:"azul",
      description:"caza monstruos con un arma innecesariamente adornada y con un gatillo carente de sentido",
      rating:0.0,
      platforms:[{"play":true},{"Xbox":true},{"PC":false}],
      genres:["1","2"],
      released:"14/01/1997"
  })
      .then(function(res){
        expect(res.body).to.deep.equal({
          id: 700001,
          name: "azul",
          description: "caza monstruos con un arma innecesariamente adornada y con un gatillo carente de sentido",
          released: "14/01/1997",
          rating: 0,
          platforms: "play, Xbox, PC.",
          background_image: "https://media.giphy.com/media/KluRpaqe0ZyyFRfDzi/giphy.gif",
          createdAt: "2021-06-24T04:06:14.505Z",
          updatedAt: "2021-06-24T04:06:14.505Z",
          genres: [
              {
                  id: 1,
                  name: "Action",
                  createdAt: "2021-06-24T04:05:48.953Z",
                  updatedAt: "2021-06-24T04:05:48.953Z",
                  game_gen: {
                      createdAt: "2021-06-24T04:06:14.754Z",
                      updatedAt: "2021-06-24T04:06:14.754Z",
                      videogameId: 700001,
                      genreId: 1
                  }
              },
              {
                  id: 2,
                  name: "Indie",
                  createdAt: "2021-06-24T04:05:48.955Z",
                  updatedAt: "2021-06-24T04:05:48.955Z",
                  game_gen: {
                      createdAt: "2021-06-24T04:06:14.766Z",
                      updatedAt: "2021-06-24T04:06:14.766Z",
                      videogameId: 700001,
                      genreId: 2
                  }
              }
          ]
      })
}))});
