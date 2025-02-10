import { LoginForm } from '@/features/auth/components/login-form'
import { SignUpForm } from '@/features/auth/components/signup-form';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createLazyFileRoute('/_auth/home')({
  component: RouteComponent,
})

function RouteComponent() {
  const [formRef, setFormRef] = useState(true);
  function HandleFormChange(){
    setFormRef((x)=>!x)
  }
  return (
    <div>
      {
        formRef ? <LoginForm RenderSignUp={HandleFormChange}/> : <SignUpForm RenderLogin={HandleFormChange}/>
      }
      
    </div>
  )
}
