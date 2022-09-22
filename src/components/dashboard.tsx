import { component$ } from '@builder.io/qwik';
import Apps from './micro/apps';

export default component$(() => {
    return (
        <div className='w-full p-4 flex-wrap'>
            <Apps />
        </div>
    );
});
