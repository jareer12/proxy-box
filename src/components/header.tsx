import { component$ } from '@builder.io/qwik';
import Button from './micro/header_button';

export default component$(() => {
    return (
        <div className='from-wood-500 via-wood-400 to-wood-500 w-full p-4 flex-wrap items-center lg:grid-cols-2 grid'>
            <div className='lg:flex hidden'>
                <h2 className='text-gray-50 text-4xl font-black'>
                    <span>
                        P
                    </span>
                    <span className='text-transparent bg-clip-text bg-gradient-to-br from-holly-300 to-violet-300'>
                        B
                    </span>
                </h2>
            </div>
            <div className='space-x-3'>
                <Button gradient={true} label={"Run"} />
                <Button label={`Docs`} />
                <Button label={"Create"} />
            </div>
        </div>
    );
});
