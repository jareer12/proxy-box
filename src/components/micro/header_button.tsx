import { component$ } from '@builder.io/qwik';

export default component$((props: { label: string, gradient?: boolean, svg?: SVGElement }) => {
    return (
        <a href="" className={`shadow-md space-x-2 float-right flex-wrap flex py-2  w-full lg:w-auto px-6 lg:mr-2 md:ml-2 ${props.gradient === true ? `hover:bg-gradient-to-br hover:from-holly-300 hover:to-violet-300` : `hover:bg-wood-600`} transition-all duration-300 rounded-md`}>
            <span>
                {props.label}
            </span>
        </a>
    );
});
