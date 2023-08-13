import { useRouter } from "next/router"
import { BuyRequest, sendBuyAppRequest } from "../../services/Requests"

function Auth() {
    
    const router = useRouter()
    const data : string  = router.query.package as string

    return (
        <div>
            
        </div>
    )
}
export default Auth