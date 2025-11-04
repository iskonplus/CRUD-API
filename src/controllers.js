export const statusOk = ( res, data) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
};

export const badRequest = ( res, message = "Bad request") => {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
};

export const notFound = ( res, message = 'Not found') => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: message }));
}