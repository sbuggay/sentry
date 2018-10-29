import * as nconf from "nconf";

import * as inquirer from "inquirer";

interface IService {
    name: string;
    script: string;
    test: string;
}

// interface IConfig {
//     services: IService[];
// }

const newServerQuestions = [
    {
        type: "input",
        name: "name"
    },
    {
        type: "input",
        name: "script"
    },
    {
        type: "input",
        name: "test"
    }
]

export function editConfig(config: Config) {

    const services: IService[] = config.get("services");
    const serviceNames = services.map(service => service.name);

    inquirer.prompt({
        type: "list",
        name: "Edit Config",
        choices: [
            ...serviceNames,
            new inquirer.Separator(),
            "New service"
        ]
    }).then((answers: any) => {
        const answer = answers["Edit Config"];
        if (answer == "New service") {
            inquirer.prompt(newServerQuestions).then((input) => {
                services.push(input as IService);
                config.set("services", services);
            });
        }
        else {
            
        }
    });
}

export default class Config {

    path: string;
    config: nconf.Provider;

    constructor(path: string) {
        this.path = path;
        this.config = nconf.file(path);
    }

    get(key: string) {
        return this.config.get(key);
    }

    set(key: string, value: any) {
        this.config.set(key, value);
        this.save();
    }

    save() {
        this.config.save(this.path);
    }
}