// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
        s4() + "-" + s4() + s4() + s4();
}

export function formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + "B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + "KB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + "MB";
    else return (bytes / 1073741824).toFixed(1) + "GB";
};