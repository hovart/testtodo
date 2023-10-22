import {useQuery} from "@tanstack/react-query";
import {$api} from "@/api";

const useTodo = function (id: number | string | null) {

    const { isPending, error, data, isSuccess } = useQuery({
        queryKey: ["todos"],
        queryFn: () => $api.get(`/todos/${id}`).then((res) => res.data)
    });

    return { isPending, error, data, isSuccess };
};

export default useTodo