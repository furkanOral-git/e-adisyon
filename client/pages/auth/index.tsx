import { useRouter } from "next/router"


function Auth() {
    
    const router = useRouter()
    const data : string  = router.query.package as string

    return (
        <div>
            
        </div>
    )
}
export default Auth