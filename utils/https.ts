const handleBasicSearch = async (
  {
    // type = 'google',
    // last_name,
    // first_name,
    // location
  }: {
    type: string
    first_name: string
    last_name: string
    location: string
  }
) => {
  // try {
  //   const res = await axios.get(
  //     `https://api.puperase.com/api/check?type=${type}&first_name=${first_name}&last_name=${last_name}&location=${location}`
  //   )
  //   return res?.data
  // } catch (err) {
  //   throw err
  // }
}

const getUserGeoLocation = async () => {
  // const response = await axios.get('http://ip-api.com/json')
  // const data = response.data
  // const location = `${data.city}, ${data.regionName}, ${data.country}`
  // return {
  //   ...data,
  //   location
  // }
}

export { handleBasicSearch, getUserGeoLocation }
