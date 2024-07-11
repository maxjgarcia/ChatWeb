import express from 'express';
import exphbs from "express-handlebars";
import { Server } from 'socket.io';

const app = express();
const PORT = 8080;

//Middleware

app.use(express.static('./src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handlebars

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set("views", "./src/views")

//routes
app.get('/', (req, res) => {
    res.render("index");
})

//listen
const httpServer = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

//websockets

const io = new Server(httpServer);

let message = [];

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on(
        "message", (data) => {
            message.push(data);
            io.emit("messageLogs", message);
        }
    )
});