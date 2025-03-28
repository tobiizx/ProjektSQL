const express = require('express'); // importowanie express
const pg = require('pg'); // importowanie pg
const app = express(); // tworzenie aplikacji express
const client = new pg.Client({ // tworzenie klienta do połączenia z bazą danych
    user: 'user13', // użytkownik
    host: '192.168.0.207', // host
    database: 'user13_db', // nazwa bazy danych
    password: '88CCC82T', // hasło
    port: 5432, // port
}); 

app.get('/', (req, res) => { // obsługa żądania GET na głównym adresie (testowa)
    res.send('Hello World!');
});

app.get('/grades/:student_id/', async (req, res) => { // obsługa żądania GET na adresie /grades/:student_id/
    const studentId = req.params.student_id; // pobranie parametru student_id z adresu
    console.log("Student ID: ", studentId); // wypisanie student_id w konsoli
    const query = `SELECT * FROM grades WHERE student_id = ${studentId}`; // zapytanie SQL
    const result  = await client.query(query); // wykonanie zapytania
    console.log("Result: "); // wypisanie wyniku w konsoli
    console.table(result.rows); // wypisanie wyniku w formie tabeli
    res.json(result.rows); // wypisz w json jak np. w talend api testerze
    res.end(); // zakończenie odpowiedzi
});

app.post('/grades/:student_id/', async (req, res) => { // obsługa żądania POST na adresie /grades/:student_id/
    const studentId = req.params.student_id; // pobranie parametru student_id z adresu
    console.log("Student ID: ", studentId); // wypisanie student_id w konsoli
    console.log("Request Body: ", req.body); // wypisanie ciała żądania w konsoli
    res.end(); // zakończenie odpowiedzi
});

app.listen(3000, async () => { // uruchomienie serwera na porcie 3000
    await client.connect(); // połączenie z bazą danych
    console.log('Connected to database'); // wypisanie informacji o połączeniu z bazą danych
    console.log('Server is running on port 3000'); // wypisanie informacji o uruchomieniu serwera
});

app.on('close', async () => { // obsługa zdarzenia zamknięcia serwera
    await client.end(); // zakończenie połączenia z bazą danych
    console.log('Disconnected from database'); // wypisanie informacji o zakończeniu połączenia z bazą danych
});
