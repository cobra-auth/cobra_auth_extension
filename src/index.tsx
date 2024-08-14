import ReactDOM from 'react-dom/client';
import { App } from './app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <div className='w-[360px] overflow-hidden h-48 select-none p-8 min-h-12 relative text-white bg-dark-800'>
        <App />
    </div>
);

