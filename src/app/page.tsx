import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Next.js starter</p>
          <h1>Cioclovina Tribe is ready to build.</h1>
          <p>TypeScript, ESLint, Prettier, and app routing are configured.</p>
        </div>
        <div className={styles.ctas}>
          <a className={styles.primary} href="/docs">
            View docs
          </a>
          <a className={styles.secondary} href="https://nextjs.org/docs">
            Next docs
          </a>
        </div>
      </main>
    </div>
  );
}
