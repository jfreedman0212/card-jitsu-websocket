function startGame(state) {
    return {
        ...state,
        totalGames: state.totalGames + 1,
    };
}

function endGame(state, didWin) {
    return {
        ...state,
        wins: didWin ? state.wins + 1 : state.wins,
    }
}

export { startGame, endGame };
