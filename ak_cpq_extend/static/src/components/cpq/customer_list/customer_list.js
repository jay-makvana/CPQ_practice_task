import { registry } from "@web/core/registry";
import { Component, useState, onWillStart } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export class CustomerList extends Component {
    static template = "ak_cpq_extend.customer_list";

    setup() {
        this.orm = useService("orm");
        this.state = useState({ customers: [] });

        onWillStart(async () => {
            this.state.customers = await this.orm.searchRead(
                "res.partner",
                [],
                ["id", "name"]
            );
        });
    }
}

registry.category("actions").add("ak_cpq_extend.CustomerList", CustomerList);
