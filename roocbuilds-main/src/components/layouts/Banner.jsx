import styles from './Banner.module.css';

export function Banner() {
    return (
        <section className={styles['banner-container']}>
            <div className={styles['banner-info']}>
                {/* Mini texto por encima del título */}
                <span className={styles['banner-tag']}> -Ragnarok Origin Classic- </span>

                {/* Título dividido en dos partes */}
                <h1 className={styles['banner-title']}>
                    Share your builds,{' '}
                    <span className={styles['banner-title-accent']}>master the game</span>
                </h1>
                
                {/* Descripción del banner */}
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