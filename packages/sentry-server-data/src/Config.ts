import * as nconf from "nconf";

import * as inquirer from "inquirer";
import { existsSync, writeFileSync } from "fs";

export const defaultConfig = {
	apikey: "",
	services: []
};

interface IService {
	name: string;
	script: string;
	test: string;
}

function serverQuestions(service?: IService): inquirer.Questions<any> {
	const buildInput = (message: string, d: string = "") => ({
		type: "input",
		name: "name",
		message,
		...(
			d
				? {
					default: d
				}
				: {})
	});
	return [
		buildInput(
			"Name (name of service)", service
				? service.name
				: ""),
		buildInput(
			"Script (command to run)", service
				? service.script
				: ""),
		buildInput(
			"Test (string to test against stdout)", service
				? service.test
				: "")
	];
}

export async function editConfig(config: Config) {
	const services: IService[] = config.get("services");
	const serviceNames = services.map((service, index) => ({ name: service.name, value: index.toString() }));

	enum EServicePrompt {
		edit_config = "edit_config",
		new_service = "new_service"
	}

	const answers: any = await inquirer.prompt({
		type: "list",
		name: "edit_config",
		message: "Edit Config",
		choices: [
			...serviceNames,
			new inquirer.Separator(), {
				name: "New Service",
				value: EServicePrompt.new_service
			}
		]
	});
	const answer = answers.EServicePrompt.edit_config;
	if (answer == EServicePrompt.new_service) {
		const input = await inquirer.prompt(serverQuestions());
		services.push(input as IService);
	} else {
		const index = parseInt(answer);
		const input = await inquirer.prompt(serverQuestions());
		services[index] = input as IService;
	}
	config.set("services", services);
}

export default class Config {
	path: string;
	config: nconf.Provider;

	constructor(configPath: string) {
		if (!existsSync(configPath)) {
			console.log(`No config file present. Creating "${configPath}"`);
			writeFileSync(configPath, JSON.stringify(defaultConfig));
		}

		this.path = configPath;
		this.config = nconf.file(configPath);
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
