'use server';

import axiosBase from '@/utils/axios.util';

// send forget password email
export const forgotAdminPassword = async (
	prevState: string | undefined,
	formData: any
) => {
	const email = formData.email;
	const id = formData.id;
	try {
		const res = await axiosBase.post(`/forget-password/${id}/send`, {
			email,
		});
		if (res.status >= 200 && res.status < 300) {
			return {
				success: 'success',
			};
		}
	} catch (error: any) {
		return {
			error: error.response.data,
		};
	}
};
//confirm code for forget password
export const confirmAdminCode = async (
	prevState: string | undefined,
	formData: any
) => {
	const code = formData.otp;
	const email = formData.email;
	const id = formData.id;
	try {
		const res = await axiosBase.post(
			`/forget-password/${id}/verify`,
			{
				email,
				code,
			}
		);
		if (res.status >= 200 && res.status < 300) {
			return {
				success: 'success',
			};
		}
	} catch (error: any) {
		return {
			error: error.response.data,
		};
	}
};
//set new password
export const newAdminPassword = async (
	prevState: string | undefined,
	formData: any
) => {
	const password = formData.password;
	const email = formData.email;
	const id = formData.id;
	try {
		const res = await axiosBase.post(
			`/forget-password/${id}/new-password`,
			{
				email,
				password,
			}
		);
		if (res.status >= 200 && res.status < 300) {
			return {
				success: 'success',
			};
		}
	} catch (error: any) {
		return {
			error: error.response.data,
		};
	}
};
