import { createRoot } from 'react-dom/client';
import App from './components/app';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <Container>
        <App />
    </Container>
);