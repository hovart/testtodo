'use client'

import React, {useEffect, useState} from "react";
import {Settings, Todos} from "@/components";
import useFetch from "@/hooks/useFetch";
import {Filters} from "@/types";

export default function Home() {

    const [filters, setFilters] = useState<Filters>({
        search: '',
        sort: '',
        completed: 'All',
        tags: ''
    })

    const {data: initialData} = useFetch({
        search: '',
        sort: '',
        completed: 'All',
        tags: ''
    })
    const {data, isPending, error, isSuccess} = useFetch(filters)

    const [tags, setTags] = useState<string[]>([])

    useEffect(() => {
        if(initialData){
            // @ts-ignore
            setTags(["All tags", ...new Set(initialData.flatMap((item: any) => item.tags))])
        }
    }, [initialData])


    return (
        <main className="content">
            <h1 className="title">{"Todo sheet app"}</h1>
            <Settings setFilters={setFilters} tags={tags}/>
            <Todos
                todos={data}
                isPending={isPending}
                isSuccess={isSuccess}
                error={error}
            />
        </main>
    )
}
