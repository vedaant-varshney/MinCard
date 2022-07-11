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

            <h2>Update Title and Description</h2>
            <form onSubmit={() => {}}>
                <label htmlFor="title">Title:</label>
                <br/>
                <input type="text" id="title" name="title"/>
                <br/>
                <label htmlFor="description">Description:</label>
                <br/>
                <input type="text" id="description" name="description"/>
                <br/>

                <button type="submit">Update Title/Description</button>


            </form>



        </div>
    );
});

export default memo(LeftWindow);