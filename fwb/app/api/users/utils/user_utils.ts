import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs'
import supabaseClient from '@/supabase'

/**
 * Inserts a new user into the database.
 *
 * @param {NextRequest} request - The request object.
 * @returns {Promise<NextResponse>} A promise that resolves to the response object.
 */
const insertUser = async (request: NextRequest) => {
    try {
        const { userId, getToken } = auth()
        const user = await currentUser()

        // Check if the user is logged in
        if (userId && user) {
            // Extract the form data
            const formData = await request.formData()

            const newUser = {
                user_id: user.id,
                username: user.username,
                email: [user.emailAddresses[0].emailAddress],
                profile_picture_url: user.imageUrl,
                user_discounts: formData.get('user_discounts') || [],
                user_groups: formData.get('user_groups') || [],
                user_messages: formData.get('user_messages') || [],
                company: formData.get('company'),
                verified: formData.get('verified') === 'false' ? false : true,
                hasCompletedFRE: formData.get('hasCompletedFRE') || [
                    false,
                    false,
                    false,
                ],
                blocked_users: formData.get('blocked_users') || [],
                reported_users: formData.get('reported_users') || [],
            }

            const supabase = await supabaseClient(
                request.headers.get('supabase_jwt')
            )
            if (!supabase) {
                return NextResponse.json(
                    { error: 'Could not create supabase access token' },
                    { status: 401 }
                )
            }

            // Insert the new user into the user table in supabase
            const { data, error } = await supabase
                .from('users')
                .insert([newUser])
                .select()

            // Check for error and return response
            if (error) {
                console.error(error)
                return NextResponse.json(
                    {
                        error: 'Failed to create new user',
                        details: error.message,
                    },
                    { status: 500 }
                )
            } else {
                return NextResponse.json({ data: data }, { status: 200 })
            }
        } else {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}

/**
 * Retrieves users registered through Clerk.
 *
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing the fetched users or an error response.
 */
const getUsers = async (request: NextRequest) => {
    try {
        const { userId, getToken } = auth()
        const user = await currentUser()
        // If the user is logged in, fetch all other users on the platform
        if (userId && user) {
            const supabase = await supabaseClient(
                request.headers.get('supabase_jwt')
            )
            if (!supabase) {
                return NextResponse.json(
                    { error: 'Could not create supabase access token' },
                    { status: 401 }
                )
            }

            let { data: users, error } = await supabase
                .from('users')
                .select('*')

            if (error) {
                return NextResponse.json(
                    { error: 'Failed to fetch users' },
                    { status: 500 }
                )
            }
            return NextResponse.json({ success: true, users }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}

/**
 * Deletes a user from the database.
 *
 * @param request - The NextRequest object containing the request details.
 * @returns A NextResponse object with the result of the deletion.
 */
const deleteUser = async (request: NextRequest) => {
    try {
        const { userId, getToken } = auth()
        const user = await currentUser()

        if (userId && user) {
            const user_id = request.nextUrl.searchParams.get('user_id')

            // Create a Supabase client with the current user's access token
            const token = request.headers.get('supabase_jwt')
            if (!token) {
                return NextResponse.json(
                    { error: 'Unauthorized' },
                    { status: 401 }
                )
            }
            const supabase = await supabaseClient(token)

            const { error } = await supabase
                .from('users')
                .delete()
                .eq('user_id', user_id)

            if (error) {
                return NextResponse.json(
                    { error: 'Failed to delete user' },
                    { status: 500 }
                )
            } else {
                return NextResponse.json(
                    { success: true, deleted: user_id },
                    { status: 200 }
                )
            }
        } else {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}

/**
 * Updates a user in the database.
 *
 * @param request - The NextRequest object containing the request details.
 * @returns A NextResponse object with the updated user data or an error message.
 */
const updateUser = async (request: NextRequest) => {
    try {
        const { userId, getToken } = auth()
        const user = await currentUser()
        if (userId && user) {
            // Create a Supabase client with the current user's access token
            const token = request.headers.get('supabase_jwt')
            if (!token) {
                console.log('no token')
                return NextResponse.json(
                    { error: 'Unauthorized' },
                    { status: 401 }
                )
            }
            const supabase = await supabaseClient(token)

            const formData = await request.formData()

            const updatedUser: any = {}

            //const user_id = formData.get("user_id");

            if (formData.get('username')) {
                updatedUser.username = formData.get('username')
            }
            if (formData.get('email')) {
                updatedUser.email = formData.get('email')
            }
            if (formData.get('profile_picture_url')) {
                updatedUser.profile_picture_url = formData.get(
                    'profile_picture_url'
                )
            }
            if (formData.get('user_discounts')) {
                updatedUser.user_discounts = formData.get('user_discounts')
            }
            if (formData.get('user_groups')) {
                updatedUser.user_groups = formData.get('user_groups')
            }
            if (formData.get('user_messages')) {
                updatedUser.user_messages = formData.get('user_messages')
            }
            if (formData.get('company')) {
                updatedUser.company = formData.get('company')
            }
            if (formData.get('verified')) {
                const isVerified =
                    formData.get('verified') === 'false' ? false : true
                updatedUser.verified = formData.get('verified')
            }
            if (formData.get('hasCompletedFRE')) {
                updatedUser.hasCompletedFRE = formData.get('hasCompletedFRE')
            }
            if (formData.get('blocked_users')) {
                updatedUser.blocked_users = formData.get('blocked_users')
            }
            if (formData.get('reported_users')) {
                updatedUser.reported_users = formData.get('reported_users')
            }

            const { data, error } = await supabase
                .from('users')
                .update(updatedUser)
                .eq('user_id', userId)
                .select()

            if (error) {
                console.log(error)
                return NextResponse.json(
                    { error: 'Failed to update user' },
                    { status: 500 }
                )
            } else {
                return NextResponse.json(
                    { success: true, updated_values: data },
                    { status: 200 }
                )
            }
        } else {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}

export { insertUser, getUsers, deleteUser, updateUser }
