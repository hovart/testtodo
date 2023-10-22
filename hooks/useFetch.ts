import {useQuery} from "@tanstack/react-query";
import {$api} from "@/api";

const useFetch = function (filters?: any, id?: number) {
    const {search, sort, completed, tags} = filters

    const { isPending, error, data, isSuccess } = useQuery({
        queryKey: ["todos", sort, search, completed, tags],
        queryFn: () => $api.get(`/todos?title_like=${search}&_sort=${sort}&tags_like=${tags}`
            + ((completed !== 'All') ? `&completed=${(completed === 'Completed')}` : ''))
            .then((res) => res.data)
    });

    return { isPending, error, data, isSuccess };
};

export default useFetch