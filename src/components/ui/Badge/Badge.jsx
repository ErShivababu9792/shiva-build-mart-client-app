import styles from "./Badge.module.css";

const Badge = ({children}) => {

return (
<span className={styles.badge}>
{children}
</span>
)

}

export default Badge;