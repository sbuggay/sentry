
import * as inquirer from "inquirer";

export function editConfig() {
    inquirer.prompt({

        type: "list",
        name: "Edit Config",
        choices: [

            new inquirer.Separator(),
        ]

    }).then((answers) => {
        console.log(answers);
    });
}