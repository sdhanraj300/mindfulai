import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import SignUpForm from '../../components/sign-up/SignUpForm'

export default async function SignUpPage() {
    const session = await getServerSession()
    if (session?.user) {
        redirect('/chat')
    }
    return <SignUpForm />
}