'use client'

import React, {FC, useState} from 'react';
import {Select} from "@/components";
import Modal from "@/components/modals/Modal";
import Form from "@/components/modals/Form";
import {Filters, SettingsProps} from "@/types";

const Settings: FC<SettingsProps> = ({setFilters, tags}) => {

    const [open, setOpen] = useState(false)

    return (
        <div className="settings">
            <div className="settings__row">
                <input
                    type="button"
                    value="Add todo"
                    className="button"
                    onClick={() => {
                        setOpen(true)
                    }}
                />
                <input
                    type="text" placeholder="Search" className="search"
                    onChange={(e) => {
                        setFilters((prevState: Filters) => ({
                            ...prevState,
                            search: e.target.value
                        }))
                    }}
                />
            </div>
            <div className="settings__row">
                <Select options={["Sorting", "title", "dueDate"]} setFilters={setFilters} type="sort"/>
                <Select options={["All", "Completed", "No completed"]} setFilters={setFilters} type="completed"/>
                <Select options={tags} setFilters={setFilters} type="tags"/>
            </div>

            {open && <Modal title="Add new todo" close={() => setOpen(false)}>
                <Form close={() => setOpen(false)}/>
            </Modal>}
        </div>
    );
};

export default Settings;