const config = {
    devServer: 
    {
        disableHostCheck: true,
        public: "https://localhost:8080",
        proxy: "http://localhost:3000"
    }
}

module.exports = config;