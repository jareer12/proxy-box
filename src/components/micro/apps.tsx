import { component$, Resource, useResource$, useStore } from '@builder.io/qwik';
import Surreal from '~/utils/db';
import logos from '~/utils/logos';

export interface Application {
    name: string,
    id: string
    type?: string
    scheme: "http" | "https"
    host: string
    port: number
}

export default component$(function () {
    const weatherResource = useResource$<any>(async () => {
        const res = await Surreal.GetTable(`apps`)
        return ((res || [])[0] || {}).result;
    });

    return <Resource
        value={weatherResource}
        onPending={() => <div>Fetching apps, please wait bruh</div>}
        onResolved={(final: any) => {
            const data: any[] = final
            return (
                <section className='grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 items-center gap-4'>
                    {data.map(app => {
                        const Logos: any = logos
                        const type: any = app.type || "node"
                        const img: any = Logos[type];
                        return <main onClick$={function () { }} className='cursor-pointer rounded-md bg-wood-300 hover:bg-wood-500 border border-wood-50 transition-all duration-200'>
                            <div className='p-3 flex items-center space-x-3'>
                                <img src={app.type != undefined ? img : `https://cdn-icons-png.flaticon.com/512/5968/5968322.png`} alt="Node.js" className='w-12 h-12' />
                                <h2>{app.name}</h2>

                            </div>
                            <div className='text-sm tracking-wider'>
                                <div className='border-t border-wood-50 w-full p-3'>
                                    <h3><strong>Scheme:</strong> {app.scheme}</h3>
                                </div>
                                <div className='border-t border-wood-50 w-full p-3'>
                                    <h3><strong>Host:</strong> {app.host}</h3>
                                </div>
                                <div className='border-t border-wood-50 w-full p-3'>
                                    <h3><strong>Port:</strong> {app.port}</h3>
                                </div>
                            </div>
                        </main>
                    })}
                </section>
            )
        }}
    />;
});
