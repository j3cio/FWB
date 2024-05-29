export async function getUserData(userId:string, bearerToken:string, supabaseToken:string) {

    var myHeaders = new Headers()
    myHeaders.append('supabase_jwt', supabaseToken)
    myHeaders.append('Authorization', `Bearer ${bearerToken}`)
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    }
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`,
        requestOptions
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      return result 
    } catch (error) {
      console.error('Error fetching data: ', error)
      throw error 
    }
  }
  
export async function getGroupData(groupId: string, bearerToken:string, supabaseToken:string) {

if (groupId) {
    var myHeaders = new Headers()
    myHeaders.append('supabase_jwt', supabaseToken)
    myHeaders.append('Authorization', `Bearer ${bearerToken}`)

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    }
    try {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/groups?group_id=${groupId}`, // add to .env
        requestOptions
    )
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result 
    } catch (error) {
    console.error('Error fetching data: ', error)
    throw error 
    }
} else {
    return {
    success: false,
    data: [
        {
        id: '',
        name: 'No group id',
        discounts: [],
        admins: ['123'],
        public: false,
        users: [],
        },
    ],
    }
}
}