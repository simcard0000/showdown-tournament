// NPM packages bundled with Browserify to use in the front-end!

const { InMemoryDatabase } = require('brackets-memory-db');
const { BracketsManager } = require('brackets-manager');

const storage = new InMemoryDatabase();
const manager = new BracketsManager(storage, true);

// populateBracket() will be called when the page/body loads... 
async function populateBracket() {
    // Creating tournament stage (everything is stored in local storage):
    await manager.create.stage({
        name: 'Bracket v1.0',
        tournamentId: 0,
        type: 'double_elimination',
        seeding: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    });
    // Rendering tournament bracket:
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

// Exporting functions so that they can be called in the HTML:
module.exports = { 'populateBracket': populateBracket }




