import { memo, forwardRef } from "react";
import classnames from 'classnames';

import styles from './LeftWindow.module.scss'


export type Props = {
    className?: string;
    title?: string;
    description?: string;
}



// We need to pass in current card title and description into LeftWindow
const LeftWindow = forwardRef(({className}: Props, ref: any) => {
    return (
        <div ref={ref} className={classnames(styles.LeftWindow, className)}>


        </div>
    );
});

export default memo(LeftWindow);