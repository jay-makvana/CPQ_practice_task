/* @odoo-module */

import {registry} from "@web/core/registry";
import {useService} from "@web/core/utils/hooks";
import {Component, onWillStart, useState} from "@odoo/owl";
import {Many2XAutocomplete} from "@web/views/fields/relational_utils";
import {_t} from "@web/core/l10n/translation";

export class DisplayContactDetails extends Component {
    static template = "ak_cpq_extend.display_contact_details";
    static components = {Many2XAutocomplete}

    setup() {
        super.setup();
        this.state = useState({
            selectedPartner: null,
            partner_name: '',
            partner_email: '',
            partner_phone: '',
        });

        this.orm = useService("orm");

    };
    getDomain() {
        return [['active', '=', true], ['type', '=', 'contact']];
    };

    async onUpdatePartner(ev) {
        if (ev) {
            let getRecord = await this.orm.read('res.partner', [ev[0].id]);
            this.state.selectedPartner = getRecord.length ? getRecord[0].display_name : null;
            this.state.partner_name = getRecord[0].name;
            this.state.partner_email = getRecord[0].email;
            this.state.partner_phone = getRecord[0].phone;
        } else {
            this.state.selectedPartner = null;
        }
    };

};
registry.category("actions").add("display_contact_details", DisplayContactDetails);
