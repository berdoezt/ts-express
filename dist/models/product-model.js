"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGetProductResponseFrom = exports.toProductModelFrom = void 0;
function toProductModelFrom(createProductRequest) {
    return {
        id: 0,
        name: createProductRequest.name,
        price: createProductRequest.price
    };
}
exports.toProductModelFrom = toProductModelFrom;
function toGetProductResponseFrom(productModel) {
    return {
        id: productModel.id,
        name: productModel.name,
        price: productModel.price
    };
}
exports.toGetProductResponseFrom = toGetProductResponseFrom;
