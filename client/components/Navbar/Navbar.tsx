import { memo } from "react";
import classnames from 'classnames';

import styles from './Navbar.module.scss'
import MinCardLogo from '@assets/images/MinCardLogo.svg'
import MagnifyingGlass from '@assets/images/MagnifyingGlass.svg'

export type Props = {
    className?: string;
}

function Navbar({ className }: Props) {
    return (
        <div className={classnames(styles.Navbar, className)}>
            <div className={styles.navElements}>
                {/* <Image src="/../../public/MinCardLogo.svg" alt="" width="40px" height="40px"/> */}
                <div className={styles.leftMenu}>
                    <MinCardLogo className={styles.logo} />
                    <p>Card Manager</p>
                </div>

                <div className={styles.search}>
                    <p>Search for a different card</p>
                    <MagnifyingGlass/>
                </div>
                <div className={styles.rightMenu}>
                    Profile
                </div>
            </div>

        </div>
    );
}

export default memo(Navbar);