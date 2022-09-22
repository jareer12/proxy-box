import { component$ } from '@builder.io/qwik';

import "./assets/css/index.css"
import "./assets/css/tailwind.css"

import Header from './components/header';
import Dashboard from './components/dashboard';

export default component$(() => {
  return (
    <div>
      <head>
        <title>Blog</title>
      </head>

      <body className='bg-gradient-to-r from-wood-500 via-wood-400 to-wood-500 text-gray-200'>
        <section className='flex flex-wrap w-full'>
          <Header />
        </section>
        <section>
          <Dashboard />
        </section>
      </body>
    </div>
  );
});
