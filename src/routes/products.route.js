import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>products</h1>')
});

// router.get('/alo', (req, res) => {
//     res.send('<h1>alo</h1>')
// });


export default router;