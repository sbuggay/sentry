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

function serverQuestions(service: IService): inquirer.Questions<any> {
    return [
        {
            type: "input",
            name: "name",
            message: "Name (name of service)",
        },
        {
            type: "input",
            name: "script",
            message: "Script (command to run)",
        },
        {
            type: "input",
            name: "test",
            message: "Test (string to test against stdout)",
        }
    ]
}

export async function editConfig(config: Config) {

    const services: IService[] = config.get("services");
    const serviceNames = services.map((service, index) => {
        return {
            name: service.name,
            value: index.toString()
        }
    });

    const answers: any = await inquirer.prompt({
        type: "list",
        name: "edit_config",
        message: "Edit Config",
        choices: [
            ...serviceNames,
            new inquirer.Separator(),
            {
                name: "New Service",
                value: "new_service"
            }
        ]
    });
    const answer = answers["edit_config"];
    // if (answer == "new_service") {
    //     inquirer.prompt(serverQuestions()).then((input) => {
    //         services.push(input as IService);
    //         config.set("services", services);
    //     });
    // }
    // else {
    //     const index = parseInt(answer);
    //     const service = services[index];
    //     inquirer.prompt(serverQuestions()).then((input) => {
    //         services.push(input as IService);
    //         config.set("services", services);
    //     });
    // }
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