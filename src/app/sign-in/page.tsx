import SignInForm from '@/components/sign-in/SignInForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
export default async function SignInPage() {
    const session = await getServerSession()
    if (session?.user) {
        redirect('/chat')
    }
    return <SignInForm />
}
