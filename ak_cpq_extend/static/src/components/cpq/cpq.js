/* @odoo-module */

import {registry} from "@web/core/registry";
import {useService} from "@web/core/utils/hooks";
import {Component, onWillStart} from "@odoo/owl";


export class CPQProductSessionData extends Component {
    static template = "ak_cpq_extend.CPQProductSessionData";

    setup() {
        super.setup();
        this.orm = useService("orm");
        this.data = [];

        onWillStart(async () => {
            let product_id = this.props.action.context.product_id;
            this.data = await this.orm.searchRead(
                "config.session",
                [['product_id', '=', product_id]],
                ['name', 'product_id', 'partner_id', 'state', 'price_total'],
            );
        });
    };

};
registry.category("actions").add("cpq_session_data", CPQProductSessionData);
