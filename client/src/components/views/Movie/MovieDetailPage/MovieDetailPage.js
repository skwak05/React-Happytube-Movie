import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../Config'
import { Row, Button } from 'antd';
import MainImage from '../Commons/MainImage';
import MovieInfoPage from './Sections/MovieInfoPage';
import GridCards from '../Commons/GridCards';
import Favorite from './Sections/Favorite';

function MovieDetailPage(props) {
    let movieId = props.match.params.movieId;

    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {
        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        fetch(endpointForMovieInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response);
            })

        fetch(endpointForCasts)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast);
            })
    }, []);

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    };

    return (
        <div>
            {/* Header */}
                <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                            title={Movie.original_title}
                            text={Movie.overview}
                />

            {/* Body */}

            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display:'flex', justifyContent:'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                {/* Movie Info */}
                    <MovieInfoPage movie={Movie} />

                <br />

                {/* Actors Grid*/}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}>Toggle Actor View </Button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]} >
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                            castName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }
            </div>
        </div>
    )
}

export default MovieDetailPage
