import { IOS } from "../reducer";

export default function osmapping(os: IOS) {

    if (os.os === "win32") {
        return "win10";
    } else if (os.os === "darwin") {
        return "apple";
    }

    if (!os.os || !os.dist) { return; }

    console.log(os);

    const mapping: { [index: string]: string } = {
        Centos: "centos"
    };

    return mapping[os.dist];
}
