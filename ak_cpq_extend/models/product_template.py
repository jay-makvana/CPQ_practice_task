# -*- coding: utf-8 -*-

from odoo import models, api


class ProductTemplateInherit(models.Model):
    _inherit = 'product.template'

    def cpq_session_data(self):
        return {
            "type": "ir.actions.client",
            "target": "current",
            "tag": "cpq_session_data",
            "context": {
                "product_id": self.id,
            }
        }
