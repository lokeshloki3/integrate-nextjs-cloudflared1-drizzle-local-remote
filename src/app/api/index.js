import { Router } from 'itty-router';

const router = Router();

// Import your route handlers
import { POST as registerUser } from './login/route.js';
import { POST as loginUser } from './signup/route.js';
// ...import other routes as needed

// Set up route handling
router.post('/users/signup', registerUser);
router.post('/users/login', loginUser);
// ...set up other routes

export default {
  fetch: (request, env, context) => router.handle(request, env, context)
};
