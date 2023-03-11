import React, { useEffect, useState } from 'react';

export const SyncView = (props: any) => {


    const threshold = 6;

    return (
        <>
            <div>
                Endpoint: TODO
            </div>
            <div>
                {
                    props.recordsCount > threshold ?
                        <div> Click to Sync </div> :
                        <div> In Sync </div>
                }
            </div>
        </>
    );
};