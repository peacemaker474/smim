import 'dotenv/config';
import './db.js';
import './models/Comment.js';
import './models/Like.js';
import './models/Post.js';
import './models/User.js';
import app from './server.js';

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ server Listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
