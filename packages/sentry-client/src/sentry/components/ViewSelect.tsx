import * as React from "react";

import { view } from "../constants";

export class ViewSelect extends React.Component<any, any> {
    public render() {
        const options = Object.keys(view).map((key: string, index) => {
            return (
                <option key={index} value={key}>
                    {view[key]}
                </option>
            );
        });

        return (
            <select>
                {options}
            </select>
        );
    }
}

export default ViewSelect;
