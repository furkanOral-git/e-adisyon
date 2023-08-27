import styles from "../../styles/Register.module.css"
const sendVertificationToEmail = (email: string) => {

    
}
function RegisterPage() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")
        const password = formData.get("password")
        const verifyPassword = formData.get("verifyPassword")
        const name = formData.get("name")
        const surname = formData.get("surname")
        

    }

    return (

        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form} action="submit">
                <input className={styles.input} name="email" type="email" placeholder="Email" />
                <input className={styles.input} name="password" type="password" placeholder="Şifreniz" />
                <input className={styles.input} name="verifyPassword" type="password" placeholder="Şifre tekrarı" />
                <input className={styles.input} name="name " type="text" placeholder="İsminiz" />
                <input className={styles.input} name="surname" type="text" placeholder="Soyisminiz" />
                <button className={styles.btn} name="submit" type="submit">Kayıt Ol</button>
            </form>
        </div>
    )
}
export default RegisterPage