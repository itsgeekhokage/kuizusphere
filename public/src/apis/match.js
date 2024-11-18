const API_URL = `${import.meta.env.VITE_HOST_API}/match`;

export const createMatch = async (matchData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchData),
    });

    if (!response.ok) {
        throw new Error('Failed to create match');
    }

    return response.json();
};

export const getMatch = async (match) => {
    const response = await fetch(`${API_URL}/byid/${match}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch match');
    }

    return response.json();
};

export const updateMatchScores = async (matchId, player, score) => {
    const response = await fetch(`${API_URL}/${matchId}/scores`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({player, score}),
    });

    if (!response.ok) {
        throw new Error('Failed to update match scores');
    }

    return response.json();
};

export const getAllMatches = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch matches');
    }

    return response.json();
};
