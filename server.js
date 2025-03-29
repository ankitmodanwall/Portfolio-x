const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/generate-portfolio', (req, res) => {
    // Simulate portfolio generation
    const portfolioData = {
        name: "Nikit Joya",
        skills: ["JavaScript", "HTML", "CSS", "React"],
        projects: [
            { title: "E-commerce with Ar", description: "Description of project 1" },
            { title: "Personal-blogs", description: "Description of project 2" }
        ]
    };
    res.json(portfolioData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
