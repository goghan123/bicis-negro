import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { MainComponent } from './Main.js';

try {
  const container = document.getElementById('root');
  const root = ReactDOMClient.createRoot(container);
  root.render(
    <React.StrictMode>
      <MainComponent />
    </React.StrictMode>
  );
} catch (e) {
  console.log(e);
}
