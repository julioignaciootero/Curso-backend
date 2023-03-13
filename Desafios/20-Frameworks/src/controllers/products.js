import { prodcutModel } from "../models/productos.js";

export const getAll = async (ctx, next) => {
  console.log("getAll");
  ctx.body = {
    status: "success",
    data: await prodcutModel.find({}),
  };
  ctx.status = 200;
};

export const save = async (ctx, next) => {
  console.log(ctx.request);
  const data = ctx.request.body;

  const result = await prodcutModel.create(data);

  ctx.body = {
    status: "success",
    data: result,
  };
  ctx.status = 201;
};

export const getById = async (ctx, next) => {
  const { id } = ctx.params;
  ctx.body = {
    status: "success",
    data: await prodcutModel.findById(id),
  };
  ctx.status = 200;
};

export const updateProd = async (ctx, next) => {
  const { id } = ctx.params;

  const data = ctx.request.body;

  await prodcutModel.findByIdAndUpdate(id, data);

  ctx.body = {
    status: "success",
    data: data,
  };
  ctx.status = 200;
};

export const removeProd = async (ctx, next) => {
  const { id } = ctx.params;
  await prodcutModel.findByIdAndDelete(id);

  ctx.status = 200;
  ctx.body = {
    status: "success",
    msg: `Producto eliminado: ${id}`,
  };
};
