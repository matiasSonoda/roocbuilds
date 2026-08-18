import styles from './banner.module.css';

export function Banner() {
    return (
        <section className={styles['banner-container']}>
            <div className={styles['banner-info']}>
                <h1 className={styles['banner-title']}>Share your builds</h1>
                <span className={styles['banner-description']}>Discover and share Ragnarok Origin Classic builds with the community.</span>
                <nav className={styles['banner-nav']}>
                    <a href="" className={styles['nav-a']}>Explore Builds</a>
                    <a href="" className={styles['nav-a']}>Publish Your Builds</a>
                </nav>
            </div>
            <div className={styles['banner-ad']}>
            </div>
        </section>
    );
}