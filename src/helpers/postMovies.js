const postMovies = async (action, reqJson) => {

    // router.post('/movies/create', moviesController.create);
    // router.post('/movies/update/:id', moviesController.update);
    // router.post('/movies/delete/:id', moviesController.destroy);

    const url = `http://localhost:3001/movies/${action}`;
    const resp = await fetch(url, {
        method: "POST",
        body:  reqJson ,
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await resp.json()
    // console.log(data)
    return (data)
}

export default postMovies
