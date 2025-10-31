// src/main.jsx
import { render } from 'preact';
import { App } from './app.jsx';

// Import Bootstrap CSS and Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import Bootstrap JavaScript (for navbar toggle, modals, etc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import your custom CSS (after Bootstrap so you can override)
import './index.css';

// Render the app
render(<App />, document.getElementById('app'));