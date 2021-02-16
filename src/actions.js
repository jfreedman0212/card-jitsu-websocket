const Pages = {
    HOME: 'HOME',
    GAME: 'GAME',
};

function startGame(state) {
    return {
        ...state,
        totalGames: state.totalGames + 1,
        currentPage: Pages.GAME,
    };
}

function endGame(state, didWin) {
    return {
        ...state,
        wins: didWin ? state.wins + 1 : state.wins,
        currentPage: Pages.HOME,
    }
}

export { startGame, endGame, Pages };
