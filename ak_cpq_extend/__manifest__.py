# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

# Author: Aktiv Software.
# mail: odoo@aktivsoftware.com
# Copyright (C) 2015-Present Aktiv Software PVT. LTD.
# Contributions:
# Aktiv Software:
# - Jay Makavana

{
    'name': 'Odoo CPQ - Custom Product Configurator Extend',
    'version': '18.0.0.0.0',
    'summary': 'Odoo CPQ - Custom Product Configurator Extend',
    'description': """
       Odoo CPQ - Custom Product Configurator Extend
    """,
    'author': 'Jay Makavana',
    'category': 'Sales/Sales',
    'depends': ['ak_odoo_cpq'],
    'data': [
        'views/product_template.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'ak_cpq_extend/static/src/components/**/*',
        ],
    },
}
