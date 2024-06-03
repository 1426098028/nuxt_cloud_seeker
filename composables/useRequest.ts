const Url =`http://localhost:8000/api/v1/cloud/resource/?`
export const useCloud = (url)=>useFetch(`${Url}${url}`)
