import React, {FC} from 'react';
import {ConfirmProps} from "@/types";

const Confirm: FC<ConfirmProps> = ({yes, no}) => {
    return (
        <div className="p-4 flex justify-center gap-8">
            <button
                style={{background: "green"}}
                className="button bg-green-500"
                onClick={yes}
            >
                Yes
            </button>
            <button
                style={{background: "red"}}
                className="button bg-red-500"
                onClick={no}
            >
                No
            </button>
        </div>
    );
};

export default Confirm;