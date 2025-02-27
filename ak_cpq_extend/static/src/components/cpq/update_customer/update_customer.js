import { registry } from "@web/core/registry";
import { Component, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { CustomerList } from "../customer_list/customer_list";
import { CustomerForm } from "../customer_form/customer_form";

class UpdateCustomer extends Component {
    static template = "ak_cpq_extend.update_customer";
    static components = { CustomerList, CustomerForm };

    setup() {
        this.orm = useService("orm");
        this.state = useState({
            selectedCustomer: null,
        });
        this.onSelectCustomer = this.onSelectCustomer.bind(this);
    }

    async onSelectCustomer(customerId) {
        if (!customerId) return;

        const [customer] = await this.orm.searchRead(
            "res.partner",
            [["id", "=", customerId]],
            ["id"]
        );

        if (customer) {
            this.state.selectedCustomer = customer;
        }
    }
}

registry.category("actions").add("ak_cpq_extend.UpdateCustomer", UpdateCustomer);
