const getMovies = async (action) => {

    // router.get('/movies/add', moviesController.add);
    // router.get('/movies/edit/:id', moviesController.edit);
    // router.get('/movies/delete/:id', moviesController.delete);

    const url = `http://localhost:3001/${action}`;

    const resp = await fetch(url);
    const data = await resp.json()
    

    const movies = data.map(movie => {

        return {

            id: movie.id,
            title: movie.title,
            rating: movie.rating,
            awards: movie.awards,
            release_date: movie.release_date,
            length: movie.length,
            genre_id: movie.genre_id

        }

    })
    // console.log(movies)
    return movies;
}

export default getMovies;

