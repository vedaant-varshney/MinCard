import { forwardRef, memo } from "react";
import classnames from 'classnames';

import styles from './Template.module.scss'


export type Props = {
    className?: string;
}

const Template = forwardRef(({className}: Props, ref: any) => {
    return (
        <div className={classnames(styles.Template, className)}></div>
    );

})

export default memo(Template);