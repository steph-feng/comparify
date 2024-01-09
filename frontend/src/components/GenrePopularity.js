import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider, createTheme } from "@mui/material/styles";

export function GenrePopularity(props) {
    return (
        <div id="gpContainer">
            <div id="genrePopularityContainer">
                <div id="genreContainer">
                    <div className="gpTitle">
                        <h1 id="genreTitle" className="subtitle">your top genres</h1>
                    </div>

                    <div id="topGenres">
                        {props.genres.slice(0, 5).map(
                            (item, index) =>
                                <div className="topGenre">
                                    <div className="genre">
                                        <p className="genreText">{index + 1}. {item}</p>
                                    </div>
                                </div>
                        )}
                    </div>
                </div>
                <div id="popularityContainer">
                    <div className="gpTitle">
                        <h1 id="popularityTitle" className="subtitle">how popular is your music taste?</h1>
                    </div>
                    <div id="progress">
                        <ThemeProvider theme={theme}>
                            <div id="circle">
                                <CircularProgress
                                    variant="determinate"
                                    value={100}
                                    color="complete"
                                    thickness={5}
                                    size="30vmin"
                                />

                                <div id="incompletePortion">
                                    <CircularProgress
                                        variant="determinate"
                                        value={100 - props.popularity}
                                        color="incomplete"
                                        thickness={5}
                                        size="30vmin"
                                    />
                                </div>

                                <div id="circleText">
                                    {props.popularity}%
                                </div>

                            </div>
                        </ThemeProvider>
                    </div>

                    {
                        props.popularity >= 70 ?
                            (<div className="comment">looks like you're pretty basic</div>) :
                            (<div className="comment">looks like you're pretty funky</div>)
                    }

                </div>
            </div>
            <div id="arrowWrapper" className="relativePosArrow">
                <a href="#topTracksContainer">
                    <button className="downArrow"></button>
                </a>
            </div>
        </div>)
}


const theme = createTheme({
    palette: {
        complete: {
            main: "#6357e6",
        },
        incomplete: {
            main: "rgb(255, 255, 255, 0.3)",
        }
    }
});