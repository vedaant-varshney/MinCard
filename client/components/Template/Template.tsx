import { memo } from "react";
import classnames from 'classnames';

import styles from './Template.module.scss'


export type Props = {
    className?: string;
}

function Template({className}: Props) {
    return (
        <div className={classnames(styles.Template, className)}></div>
    );
}

export default memo(Template);