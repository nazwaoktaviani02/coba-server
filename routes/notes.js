import { Router } from "express";
import Note from "../models/note.js";
import {Post} from "../models/schemas/index.js";

const router = Router();

//GET semua notes
router.get("/", async( req, res, next) => {
    try{
        const notes = await Post.find();
        res.json(notes);
    } catch (e){
        next(e);
    }
});

// GET by id
router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try{
        console.log(id);
        const note = await Post.findById(id); 
        
        res.json(note);
    } catch (e){
        next(e);
    }
});


// POST insert
router.post('/', async(req, res, next) => {
    const { title, content } = req.body;
    
    if (!title || !content){
        return res.status(400).json({
            message: "Title and content are required",
        });
    }

    try {
        const note = await Post.create({
            title,
            content,
        });
        res.status(201).json(note);
    
    } catch (e) {
        next(e);
    } 

});

//UPDATE 
router.put("/:id", async (req, res, next) => {
    try{
        const note = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        
        );

        res.json(note);
    } catch (e){
        next(e);
    }
});

//DELETE
router.delete("/:id", async(req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({result: "success"});
    } catch (e){
        next(e);
    }
});

export default router;

// router.get('/',(req, res, next) => {
//     const notes = Note.list();
//     res.json(notes);
// });

// router.put('/:id', (req, res, next) => {
//     const id = Number(req.params.id);
//     const { title, content } = req.body;
//     try {
//         const note = Note.update(id, title, content);
//         res.json(note);

//     } catch (e){
//         next(e);
//     }
// });

// router.delete('/:id', (req, res, next) => {
//     const id = Number(req.params.id);
//     try{
//         Note.delete(id);
//         res.json({result: 'success'}
//         );
//     } catch (e){
//         next(e);
//     }
// });

