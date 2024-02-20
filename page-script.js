// NPM packages bundled with Browserify to use in the front-end

const { InMemoryDatabase } = require('brackets-memory-db');
const { BracketsManager } = require('brackets-manager');

const storage = new InMemoryDatabase();
const manager = new BracketsManager(storage, true);

async function populateBracket() {
    await manager.create.stage({
        name: 'Pokémon Showdown! - Future Nostalgia v1.0 W24 Tournament',
        tournamentId: 0,
        type: 'double_elimination',
        seeding: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    });
    let data = await manager.get.tournamentData(0);

    window.bracketsViewer.render({
        stages: data.stage,
        matches: data.match,
        matchGames: data.match_game,
        participants: data.participant,
    }, {
        clear: true,
    });
}

module.exports = { 'populateBracket': populateBracket }




