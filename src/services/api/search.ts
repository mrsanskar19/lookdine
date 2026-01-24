import { api } from "./api"

export const search = {
    get:async<T>(q:string)=>{
        const res = await api.get<{data:T}>(`/search?q=${q}`)
        return res
    },
    users:async(q:string)=>{
        const res = await api.get<{data:any}>(`/users/search?q=${q}`)
        return res.data
    },
    hotels:async(q:string)=>{
        const res = await api.get<{data:any}>(`/hotels/search?q=${q}`)
        return res.data
    }
}