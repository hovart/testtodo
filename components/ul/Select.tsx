import React, {FC} from 'react';
import {SelectProps} from "@/types";

const Select: FC<SelectProps> = ({options, setFilters, type}) => {

    return (
        <form className="sm:w-1/3 w-full mt-2 sm:my-0">
            <fieldset>
                <div className="relative border border-gray-300 text-gray-800 bg-white shadow-lg">
                    <label htmlFor="frm-whatever" className="sr-only">My field</label>
                    <select
                        className="appearance-none w-full py-1 px-2 bg-white outline-0" name="whatever"
                        id="frm-whatever"
                        onChange={(e) => {
                            // @ts-ignore
                            setFilters(prevState => ({
                                ...prevState,
                                [type]: e.target.value !== 'All tags' ? e.target.value : ''
                            }))
                        }}
                    >
                        {
                            options.map((option) => {
                                return <option value={option} key={option}>{option}</option>
                            })
                        }
                    </select>
                    <div
                        className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
            </fieldset>
        </form>
    );
};

export default Select;