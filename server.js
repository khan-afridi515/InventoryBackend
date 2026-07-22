
import 'dotenv/config';

import { app } from "./app.js";

app.listen(3000, () => {
    console.log("Port is running on 3000");
});

