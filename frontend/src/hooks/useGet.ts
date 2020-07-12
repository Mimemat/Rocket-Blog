import useSWR from 'swr'
import api from '../services/api'

export function useGet<Data = any>(url: string) {
  const {data, error } = useSWR<Data>(url, async url => {
    const response = await api.get(url)

    return response.data
  })

  return {data, error}
}
