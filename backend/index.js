import express from "express"
import mysql from "mysql2"
import cors from "cors"
const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Axis2878cruze#",
    database: "test"
})

//to send data to express from postman body raw
app.use(express.json())
app.use(cors(
    {
        origin:["https://book-store-frontend-alpha-three.vercel.app/"],
        credentials:true
    }
))

app.get("/books", (request, response) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) return response.json(err)
        return response.json(data)
    })
})

app.post("/books", (request, response) => {
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
    // const values=[
    //     "title from backend",
    //     "desc from backend",
    //     "cover pic from backend"
    // ]
    const values = [
        request.body.title,
        request.body.desc,
        request.body.price,
        request.body.cover,
    ]
    db.query(q, [values], (err, data) => {
        if (err) return response.json(err)
        return response.json("Successfully created")
    })
})

app.delete("/books/:id", (request, response) => {
    const bookId = request.params.id
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if (err) return response.json(err)
        return response.json("Successfully deleted")
    })
})
app.put("/books/:id", (request, response) => {
    const bookId = request.params.id
    const q = "UPDATE books SET `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id = ?"
    const values = [
        request.body.title,
        request.body.desc,
        request.body.price,
        request.body.cover,
    ]
        
    db.query(q, [...values,bookId], (err, data) => {
        if (err) return response.json(err)
        return response.json("Successfully updated")
    })
})


app.listen(8800, () => {
    console.log("Connected to Backend!")
})