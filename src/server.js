import http from 'node:http';

const PORT = Number(process.env.PORT || 4000);

const server = http.createServer(async (req, res) => {

})

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});