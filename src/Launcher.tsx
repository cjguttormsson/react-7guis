import React, { useState } from 'react';
import Counter from './Counter';

const guis: (({}) => JSX.Element)[] = [Counter];

const Launcher = ({}) => {
    const [SelectedGui, SetSelectedGui] = useState<(({}) => JSX.Element) | null>(null);

    return (SelectedGui === null) ? (
        <>
            {
                guis.map((gui) =>
                    <p key={gui.name}>
                        <button onClick={() => { SetSelectedGui(() => gui); console.log(`SelectGui is ${gui}`)}}>
                            {gui.name}
                        </button>
                    </p>
                )
            }
        </>
    ) : (
        <>
            <SelectedGui />

            <p>
                <button onClick={() => SetSelectedGui(null)}>
                    Return to Launcher
                </button>
            </p>
        </>
    );
};


export default Launcher;