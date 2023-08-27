import { useEffect } from "react"
import styles from "../styles/Home.module.css"

import { useRouter } from "next/router"

function Home() {

    const router = useRouter()
    

    return (
        <div className={styles.container}>
            Ana Sayfa
        </div>
    )
}
export default Home