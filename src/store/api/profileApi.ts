import { baseApi } from "./baseApi";
import { GetProfileResponse } from "./types/profile";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfileImage: builder.mutation({
      query: (file: File) => {
        const formData = new FormData();
        formData.append("image", file);

        return {
          url: "/profile/update-profile-image",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Profile"],
    }),

    updateProfileName: builder.mutation<void, { fullName: string }>({
      query: (data) => ({
        url: "/profile/update-profile-name",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileNameMutation,
} = profileApi;

export default profileApi;
