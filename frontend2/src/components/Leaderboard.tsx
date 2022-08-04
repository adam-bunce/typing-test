import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableContainer,
    TableHead,
    TableCell,
    TableBody,
    Grid,
    TableRow,
    Typography,
    Button,
    Paper,
    Skeleton,
} from "@mui/material";

import ReplayIcon from "@mui/icons-material/Replay";

function Leaderboard() {
    interface leaderboardState {
        score: number;
        accuracy: number;
        duration: number;
        User: { username: string };
    }

    const [leaderboardData, setLeaderboardData] =
        useState<Array<leaderboardState>>();

    const getLeaderBoardData = async () => {
        await axios
            .get("http://localhost:8000/games", {}) // need to edit this controller to do a table join for username
            .then((response) => {
                console.log(response.data);
                setLeaderboardData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getLeaderBoardData();
    }, []);

    return (
        <Grid container p={5} justifyContent={"center"}>
            <Grid item xs={10} md={6} lg={4}>
                <Typography variant="h4" align="center">
                    Leaderboard
                </Typography>
                <TableContainer
                    component={Paper}
                    elevation={1}
                    variant="outlined"
                >
                    <Table>
                        <TableHead>
                            <TableCell>Rank</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>WPM</TableCell>
                            <TableCell>Accuracy</TableCell>
                            <TableCell>Length (sec) </TableCell>
                        </TableHead>
                        <TableBody>
                            {leaderboardData ? (
                                <>
                                    {leaderboardData.map(
                                        (
                                            game: leaderboardState,
                                            index
                                        ): ReactElement => {
                                            let username = "";

                                            game.User
                                                ? (username =
                                                      game.User.username)
                                                : (username = "Anon");

                                            return (
                                                <TableRow>
                                                    <TableCell>
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {username}
                                                    </TableCell>
                                                    <TableCell>
                                                        {game.score}
                                                    </TableCell>
                                                    <TableCell>
                                                        {game.accuracy}%
                                                    </TableCell>
                                                    <TableCell>
                                                        {game.duration}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                </>
                            ) : (
                                <>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                        (): ReactElement => {
                                            return (
                                                <TableRow>
                                                    <TableCell>
                                                        <Skeleton></Skeleton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton></Skeleton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton></Skeleton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton></Skeleton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton></Skeleton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <Button
                    variant="contained"
                    endIcon={<ReplayIcon />}
                    onClick={() => {
                        setLeaderboardData(undefined);
                        getLeaderBoardData();
                    }}
                >
                    Refresh
                </Button>
            </Grid>
        </Grid>
    );
}

export default Leaderboard;
