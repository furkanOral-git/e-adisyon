import styles from "../styles/Home.module.css"

import { useRouter } from "next/router"

function Home() {
    const router = useRouter()
    const handleClick = (type: number) => {

        let data: string = ""
        if (type == 0) data += "Free"
        if (type == 1) data += "Package1"
        if (type == 2) data += "Package2"
        const url = `/auth?package=${data}`
        router.push(url)

    }
    return (
        <div className={styles.container}>
            <div className={styles.packages}>
                <div onClick={() => handleClick(0)}  className={styles.package}>
                </div>
                <div onClick={() => handleClick(1)}  className={styles.package}>
                </div>
                <div onClick={() => handleClick(2)} className={styles.package}>
                </div>
            </div>
        </div>
    )
}
export default Home