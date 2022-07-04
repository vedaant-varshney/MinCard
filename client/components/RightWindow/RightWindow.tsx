import { memo, forwardRef } from "react";
import classnames from 'classnames';

import styles from './RightWindow.module.scss'


export type Props = {
    className?: string;
}

const  RightWindow = forwardRef(({className}: Props, ref: any) => {
    return (
        <div ref={ref} className={classnames(styles.RightWindow, className)}></div>
    );
})

export default memo(RightWindow);