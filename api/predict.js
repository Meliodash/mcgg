export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { enemies } = req.body;
    if (!Array.isArray(enemies) || enemies.length !== 7) {
        return res.status(400).end();
    }

    res.status(200).json({
        ronde8: enemies[1],
        ronde9: enemies[4],
        ronde10: enemies[3]
    });
}
