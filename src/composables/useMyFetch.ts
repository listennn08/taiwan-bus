export default createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
  options: {
    beforeFetch(config) {
      const token = localStorage.getItem('token')

      config.options.headers = {
        ...config.options.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }
      if (token) {
        config.options.headers = {
          ...config.options.headers,
          Authorization: `Bearer ${token}`,
        }
      }

      return config
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
}) as typeof useFetch
