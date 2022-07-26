const Game = require("../models/gameModel");
const User = require("../models/userModel");
const { Op } = require("sequelize");

const getTopGames = async (req, res) => {
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();

    const allGames = await Game.findAll({
        attributes: ["score", "accuracy", "duration"],
        include: [{ model: User, attributes: ["username"] }],
        order: [["score", "DESC"]],
        limit: 10,
    });

    const pastDayGames = await Game.findAll({
        where: { createdAt: { [Op.gt]: TODAY_START, [Op.lt]: NOW } },
        attributes: ["score", "accuracy", "duration"],
        include: [{ model: User, attributes: ["username"] }],
        order: [["score", "DESC"]],
        limit: 10,
    });

    res.send({ day: pastDayGames, all: allGames }).status(200);
};

const getMyGames = async (req, res) => {
    await Game.findAll({
        where: { userId: req.params.id },
        attributes: {
            exclude: ["id", "userId", "UserId", "updatedAt"],
        },
    })
        .then((response) => {
            res.send(response);
            res.status(200);
        })
        .catch((err) => {
            res.send(err);
            res.status(400);
        });
};

const createGame = async (req, res) => {
    const userId = res.locals.userId;
    const { score, accuracy, duration } = req.body;
    console.log(req.body);
    await Game.create({
        UserId: userId,
        score,
        accuracy,
        duration,
    })
        .then((response) => {
            res.send(`Game ${response.id} created`);
            res.status(200);
        })
        .catch((err) => {
            res.send(err);
            res.status(400);
        });
};

module.exports = { getTopGames, getMyGames, createGame };
