import * as React from "react";
import * as renderer from "react-test-renderer";
import { List } from "../../src/components/List";
import Server from "../../src/components/Server";
import Service from "../../src/components/Service";
import { shallow } from "enzyme";
import sinon from "sinon";

describe("List", () => {
	it("renders servers", () => {
		const servers = {
      foo: {
        name: "foo",
        host: "",
        status: 0,
        data: {
        }
      },
      bar: {
        name: "bar",
        host: "",
        status: 1,
        data: {
        }
      }
    };

    const wrapper = shallow(<List view={"Servers"} servers={servers} />);
    expect(wrapper.find(Server)).toHaveLength(2);
    expect(wrapper.find(Service)).toHaveLength(0);
  });

	it("renders services", () => {
    const servers = {
      foo: {
        name: "foo",
        host: "",
        status: 0,
        serviceInfo: {
          boo: {
            name: "boo",
            script: "",
            test: "",
            status: true
          },
          bar: {
            name: "bar",
            script: "",
            test: "",
            status: true
          },
          baz: {
            name: "baz",
            script: "",
            test: "",
            status: true
          }
        }
      }
    };

    const wrapper = shallow(<List view={"Services"} servers={servers} />);
    expect(wrapper.find(Service)).toHaveLength(3);
    expect(wrapper.find(Server)).toHaveLength(0);
	});
});