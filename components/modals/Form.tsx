'use client'

import React, {FC, useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import {Controller, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
// @ts-ignore
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from "@/helpers/constants";
import {addTodo, editTodo} from "@/helpers/crud";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {FormProps} from "@/types";

interface FormData {
    id: number | string
    title: string,
    description: string,
    dueDate: string | Date,
    tags: string[],
    completed: boolean
};

const schema = yup
    .object({
        title: yup.string().required("Title is required")
            .min(3, "Minimum 3 letters")
            .max(20, "Maximum 20 letters"),
        description: yup.string(),
        dueDate: yup.date().default(() => new Date())
    })
    .required()

const Form: FC<FormProps> = ({close, todo}) => {

    const queryClient = useQueryClient()

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid  },
    } = useForm<FormData>({
        mode: 'all',
        // @ts-ignore
        resolver: yupResolver(schema),
    })

    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        if(todo){
            setValue('title', todo.title)
            setValue('description', todo.description)
            setValue('dueDate', new Date(todo.dueDate))
            setTags(todo.tags)
        }
    }, [todo])

    const add = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        },
    })

    const edit = useMutation({
        mutationFn: editTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        },
    })

    const onSubmit = (data: FormData) => {
        data.tags = tags
        data.dueDate = formatDate(data.dueDate)
        data.completed = false

        if(todo){
            data.completed = todo.completed
            data.id = todo.id
            edit.mutate(data)
        } else {
            add.mutate(data)
        }
        close()
    }

    return (
        <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Title <span className="text-sm text-red-500">*{errors?.title?.message}</span>
                </label>
                <input
                    {...register("title")}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Title"
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Description
                </label>
                <textarea
                    {...register("description")}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Description"
                >
                    </textarea>
            </div>

            <div className="mb-6">
                <TagsInput value={tags} onChange={(tags: string[]) => setTags(tags)} />
            </div>

            <div className="mb-6">
                <Controller
                    control={control}
                    name='dueDate'
                    render={({ field }) => (
                        <DatePicker
                            placeholderText='Select date'
                            onChange={(date) => field.onChange(date)}
                            // @ts-ignore
                            selected={field.value}
                            className="border border-gray-300 p-2 rounded-md bg-gray-50"
                        />
                    )}
                />
            </div>

            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-30"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default Form;