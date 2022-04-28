import useSWR from 'swr';
import axios from 'axios';

export default function usePublishedQuiz(id) {
  const fetcher = url => axios.get(url).then(res => res.data);

  const { data, mutate, error } = useSWR(
    `/published/${id}`,
    fetcher,
    { shouldRetryOnError: false, revalidateOnFocus: false }
  )
  const loading = !data && !error;
  const loggedOut = !!error;

  return {
    mutate,
    loading,
    loggedOut,
    quiz: data
  }
}
