/**
 * @fileoverview Forbid the use of global module/test/asyncTest.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const utils = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid global module/test/asyncTest",
            category: "Possible Errors"
        },
        schema: []
    },

    create: function (context) {
        const MESSAGE = "Unexpected global `{{ callee }}`.";

        function isModuleOrTest(calleeNode) {
            return utils.isModule(calleeNode) || utils.isTest(calleeNode);
        }

        return {
            "CallExpression[callee.type='Identifier']": function (node) {
                if (isModuleOrTest(node.callee)) {
                    context.report({
                        node: node,
                        message: MESSAGE,
                        data: {
                            callee: node.callee.name
                        }
                    });
                }
            }
        };
    }
};
