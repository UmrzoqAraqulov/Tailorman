import { create } from "zustand";
import { request } from "../server/request";
import { toast } from "react-toastify";

export const useOrders = create((set) => ({
  ordersData: [],
  ordersArchive: [],
  loading: false,
  loadingBtn: false,
  totalArchive: 0,
  total: 0,
  getOrders: async ({ page, search, pageLimit }) => {
    try {
      set({ loading: true });
      const { data } = await request.post(`orders/in_process`, {
        searchText: search,
        pageSize: pageLimit,
        pageNumber: page,
      });
      const { totalCount, items } = data.page;
      set({ total: totalCount, ordersData: items });
    } finally {
      set({ loading: false });
    }
  },
  getOrdersArchive: async ({ page, search, pageLimit }) => {
    try {
      set({ loading: true });
      const { data } = await request.post(`orders/archive`, {
        searchText: search,
        pageSize: pageLimit,
        pageNumber: page,
      });
      const { totalCount, items } = data.page;
      set({ totalArchive: totalCount, ordersArchive: items });
    } finally {
      set({ loading: false });
    }
  },
  postOrder: async (order) => {
    try {
      set({ loadingBtn: true });
      await request.post("orders", order);
      toast.success("Buyurtma qo'shildi");
    } catch {
      toast.error("Buyurtma qo'shilmadi,Qayta urinib ko'ring");
    } finally {
      set({ loadingBtn: false });
    }
  },
  putOrder: async ({ order, id }) => {
    try {
      set({ loadingBtn: true });
      await request.put(`orders/${id}`, order);
      toast.success("Buyurtma uzgartirildi");
    } catch {
      toast.error("Buyurtma uzgartirilmadi,Qayta urinib ko'ring");
    } finally {
      set({ loadingBtn: false });
    }
  },
}));
