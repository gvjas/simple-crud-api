

const responseCodeMesssage = (res, code, message) => {
    res.writeHead(code, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(message))
    
}

const parseRequestPerson = async (req)=> {
    try {
        const buffers = [];
        for await (const chunk of req) {
            buffers.push(chunk);
        }
        return JSON.parse(Buffer.concat(buffers).toString())
    } catch (err) {
        throw new Error()
    }
}

export { parseRequestPerson, responseCodeMesssage }