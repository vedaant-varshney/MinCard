import { memo } from "react";
import classnames from 'classnames';

import styles from './Navbar.module.scss'
import MinCardLogo from '@assets/images/MinCardLogo.svg'

export type Props = {
    className?: string;
}

function Navbar({className}: Props) {
    return (
        <div className={classnames(styles.Navbar, className)}>
            <div className={styles.navElements}>
                <MinCardLogo/>
                {/* <Image src="/../../public/MinCardLogo.svg" alt="" width="40px" height="40px"/> */}
                <div className={styles.search}>Search for a different card</div>

            </div>

        </div>
    );
}

export default memo(Navbar);