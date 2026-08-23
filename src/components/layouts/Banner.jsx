import { useState } from 'react';
import styles from './Banner.module.css';

export function Banner() {
    const [activeLink, setActiveLink] = useState(null);

    const handleLinkClick = (e, linkName) => {
        e.preventDefault(); 
        if (activeLink === linkName) {
            setActiveLink(null);
        } else {
            setActiveLink(linkName);
        }
    };

    return (
        <section className={styles['banner-container']}>
            <div className={styles['banner-info']}>
                <h1 className={styles['banner-title']}>Share your builds</h1>
                <span className={styles['banner-description']}>Discover and share Ragnarok Origin Classic builds with the community.</span>
                <nav className={styles['banner-nav']}>
                    
                    {/* ENLACE 1: Forma segura de aplicar la clase active */}
                    <a 
                        href="" 
                        onClick={(e) => handleLinkClick(e, 'explore')}
                        className={activeLink === 'explore' ? `${styles['nav-a']} ${styles.active}` : styles['nav-a']}
                    >
                        Explore Builds
                    </a>
                    
                    {/* ENLACE 2 */}
                    <a 
                        href="" 
                        onClick={(e) => handleLinkClick(e, 'publish')}
                        className={activeLink === 'publish' ? `${styles['nav-a']} ${styles.active}` : styles['nav-a']}
                    >
                        Publish Your Builds
                    </a>

                </nav>
            </div>
            <div className={styles['banner-ad']}>
            </div>
        </section>
    );
}