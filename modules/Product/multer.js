import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, 'uploads'))
    },

    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

const upload = multer({storage,
    limits:{
        fileSize:10*1024*1024
    }
})

export default upload;