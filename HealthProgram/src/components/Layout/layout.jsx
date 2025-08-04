import styles from "./Layout.module.scss";
function Layout({ children }) {
  return (
    <main className={styles.wrapLayout}>
      <div className={styles.container}>{children}</div>
    </main>
  );
}
export default Layout;
