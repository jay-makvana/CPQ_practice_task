import { registry } from "@web/core/registry";
import { Component, useState, useEffect } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";

export class CustomerForm extends Component {
    static template = "ak_cpq_extend.customer_form";
    static props = {
        customer: Number
    };

    setup() {
        this.orm = useService("orm");
        this.notification = useService("notification");
        this.state = useState({
            name: "",
            email: "",
            mobile: "",
            website: "",
            phone: "",
        });

        useEffect(() => {
            if(this.props.customer.id)
                {
                    this.customer_details = this.orm.searchRead(
                        "res.partner",
                        [['id', '=', this.props.customer.id]],
                        ['name', 'email', 'mobile', 'phone', 'website'],
                    ).then((rec) => {
                            let customer_details = rec[0];
                            this.state.name = customer_details.name
                            this.state.email = customer_details.email
                            this.state.mobile = customer_details.mobile
                            this.state.phone = customer_details.phone
                            this.state.website = customer_details.website
                        }
                    );
                }
            }, () => [this.props.customer.id]
        );
    };

    async onclickUpdateCustomer(ev) {
        try {
            await this.orm.write("res.partner", [this.props.customer.id],{
                name: this.state.name,
                email: this.state.email,
                mobile: this.state.mobile,
                phone: this.state.phone,
                website: this.state.website,
            });
            this.notification.add(
                _t("Contact details updated."),
                { type: "success" }
            );
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    }
}

registry.category("actions").add("ak_cpq_extend.CustomerForm", CustomerForm);
