const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '64b9f48408b5068b58350a00778439b5',
    originalImage: (imgPath) => 'https://image.tmdb.org/t/p/original/${imgPath}',
    w500Image: (imgPath) => 'https://image.tmdb.org/t/p/w500/${imgPath}',
}

export default apiConfig;