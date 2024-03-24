"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGetProductResponseFrom = void 0;
function toGetProductResponseFrom(productModel) {
    return {
        id: productModel.id,
        name: productModel.name,
        price: productModel.price
    };
}
exports.toGetProductResponseFrom = toGetProductResponseFrom;
