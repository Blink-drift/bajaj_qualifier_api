const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "https://bajaj-qualifier-api-22bcs13159.vercel.app" }));
app.use(express.json());


app.post("/bfhl", (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ status: "error", message: "Missing fields" });
    }
    const numbers = data.filter(char => /\d/.test(char));
    const alphabets = data.filter(char => /[a-zA-Z]/.test(char));
    const highest_alphabet = (alphabets.length !== 0?alphabets.reduce((max, curr) => (curr > max ? curr : max)): []);

    res.json({
        is_success: true,
        user_id: "Sayak_Singha_16012004", email: "22bcs13159@cuchd.in",
        roll: "22BCS13159",
        numbers : numbers,
        alphabets : alphabets,
        highest_alphabet : highest_alphabet,
    });
});


app.get("/bfhl", (req, res) => {
    res.json({ operation_code: "1" });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
