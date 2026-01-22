// src/debug-imports.ts

import { OrGate } from "../../gates/or";
import { AndGate } from "../../gates/and";
import { MajorityGate } from "../../gates/majority";
import { NandGate } from "../../gates/nand";
import { NorGate } from "../../gates/nor";
import { XnorGate } from "../../gates/xnor";
import { XorGate } from "../../gates/xor";

console.log('=== Debug: Checking imports ===');
console.log('AndGate:', AndGate);
console.log('AndGate constructor:', AndGate?.prototype?.constructor);
console.log('AndGate defined?', typeof AndGate !== 'undefined');
console.log('OrGate:', OrGate);
console.log('XorGate:', XorGate);
console.log('NandGate:', NandGate);
console.log('NorGate:', NorGate);
console.log('XnorGate:', XnorGate);
console.log('MajorityGate:', MajorityGate);

// 尝试实例化
try {
    console.log('Trying to create AndGate instance...');
    const andGate = new AndGate();
    console.log('AndGate instance created:', andGate);
    console.log('AndGate.execute:', andGate.execute);
} catch (error) {
    console.error('Error creating AndGate instance:', error);
}