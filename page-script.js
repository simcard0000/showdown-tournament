// NPM packages bundled with Browserify to use in the front-end

const { InMemoryDatabase } = require('brackets-memory-db');
const { BracketsManager, StageCreator } = require('brackets-manager');

const storage = new InMemoryDatabase();
const manager = new BracketsManager(storage, true);

async function populateBracket() {
    await manager.create.stage({
        name: 'Pokémon Showdown! - Future Nostalgia v1.0 W24 Tournament',
        tournamentId: 0,
        type: 'double_elimination',
        seeding: ['Team 1', 'Team 2', 'Team 3', 'Team 4'],
    });
    await manager.update.match({
        id: 0, // First match of winner bracket (round 1)
        opponent1: { score: 16, result: 'win' },
        opponent2: { score: 12 },
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




