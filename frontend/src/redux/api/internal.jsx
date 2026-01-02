import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const InternalApi = createApi({
    reducerPath: "internalApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8081",
    }),
    endpoints: (builder) => ({
        health: builder.query({
            query: () => "/health",
        }),
        process: builder.mutation({
            query: () => ({
                url: "/process",
                method: "GET",
            }),
        }),
        payment: builder.mutation({
            query: () => ({
                url: "/payment",
                method: "GET",
            }),
        }),
        metrics: builder.query({
            query: () => "/metrics",
            pollingInterval: 2000,
        }),

        chaosOn: builder.mutation({
            query: () => ({
                url: "/chaos/on",
                method: "POST",
            }),
        }),

        chaosOff: builder.mutation({
            query: () => ({
                url: "/chaos/off",
                method: "POST",
            }),
        }),
    })
})

export const { useHealthQuery, useProcessMutation, usePaymentMutation, useMetricsQuery, useChaosOnMutation, useChaosOffMutation } = InternalApi;