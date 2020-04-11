import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Axios from 'axios';

function Favorite(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    };

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    useEffect(() => {
        Axios.get('/api/movie/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert("Failed to get the number of favorite for this movie");
                }
            })

        Axios.get('/api/movie/favorite/favorited', variables)
            .then(response => {
                if(response.data.success) {
                    setFavorited(response.data.favorited);
                } else {
                    alert("Failed to get the info");
                }
            })
    }, []);

    const onClickFavorite = () => {
        if(Favorited) {
            Axios.post('/api/movie/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    } else {
                        alert("Failed to remove from the list of favorite.");
                    }
                })
        } else {
            Axios.post('/api/movie/favorite/addToFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    } else {
                        alert("Failed to add the list of favorite.");
                    }
                })
        }
    };

    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? " Not Favorite" : "Add to Favorite "} {FavoriteNumber} </Button>
        </div>
    )
}

export default Favorite