import ReactDOM from 'react-dom/client';
import React from 'react';
import { App } from './app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <div className='w-[360px] h-[600px] overflow-hidden select-none p-8 relative bg-cover bg-no-repeat bg-black/60 text-white'>
            <div className="z-10 w-full h-full relative">
                <App />
            </div>
        </div>
        <div className=" inset-0 w-full h-full absolute bg-cover -z-10 bg-no-repeat" style={{ backgroundImage: 'url(https://therealworld.ag/assets/matrix-bg-bw-hYk5JvoA.jpg)' }} />
    </React.StrictMode>
);

