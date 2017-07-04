import * as React from "react";

import { ServerView } from "../constants/serverView";

export class ServerViewSelect extends React.Component<any, any> {
    render() {
        const options = Object.keys(ServerView).map((view, index) => {
            return (
                <option key={index} value={view}>
                    {ServerView[view]}
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

export default ServerViewSelect;
